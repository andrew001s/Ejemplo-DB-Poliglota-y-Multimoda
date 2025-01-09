import neo4j from "neo4j-driver";
import { MongoClient } from "mongodb";

// Conectar a Neo4j
const neo4jDriver = neo4j.driver(
    'bolt://34.205.31.85:7687', 
    neo4j.auth.basic('neo4j', 'password')
  );

const neo4jSession = neo4jDriver.session();

// Conectar a MongoDB
const mongoClient = new MongoClient('mongodb://34.205.31.85:27017');
const mongoDb = mongoClient.db('social_media');
const usersCollection = mongoDb.collection('users');

async function suggestFriends(userId,interests) {
    // Paso 1: Obtener amigos de amigos desde Neo4j
    const result = await neo4jSession.run(`
      MATCH (user:User {id: $userId})-[:FRIENDS_WITH]->(friend:User)-[:FRIENDS_WITH]->(suggestedFriend:User)
      WHERE NOT (user)-[:FRIENDS_WITH]->(suggestedFriend)
      RETURN suggestedFriend
    `, { userId });
  
    const suggestedFriends = result.records.map(record => record.get('suggestedFriend').properties.id.low);
  
    const query = { _id: { $in: suggestedFriends } };
    if (interests) {
        query.interests = interests;
    }

    const suggestedUsers = await usersCollection.find(query).toArray();
  
    // Paso 3: Devolver las sugerencias con intereses
    return suggestedUsers.map(user => ({
      name: user.name,
      interests: user.interests
    }));
  }

export default suggestFriends;