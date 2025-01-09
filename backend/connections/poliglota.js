import neo4j from "neo4j-driver";
import { MongoClient } from "mongodb";

const neo4jDriver = neo4j.driver(
    'bolt://34.205.31.85:7687', 
    neo4j.auth.basic('neo4j', 'password')
  );

const neo4jSession = neo4jDriver.session();

const mongoClient = new MongoClient('mongodb://34.205.31.85:27017');
const mongoDb = mongoClient.db('social_media');
const usersCollection = mongoDb.collection('users');

async function suggestFriends(userId, interests) {
  const session = neo4jDriver.session(); 
  try {

      const result = await session.run(`
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


      return suggestedUsers.map(user => ({
          id: user._id,
          name: user.name,
          interests: user.interests
      }));
  } catch (err) {
      console.error('Error fetching suggested friends:', err);
      throw err;
  } finally {
      session.close(); 
  }
}


export default suggestFriends;