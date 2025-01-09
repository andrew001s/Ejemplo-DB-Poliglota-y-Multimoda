import { Database } from "arangojs";


const db = new Database({
  url: "http://54.208.181.222:8529", 
});
db.useBasicAuth("root", "12345678");  
db.userDatabases("_system");  

async function getFriendRecommendations(userId, interests) {
    try {
      const query = `
        FOR friend IN 2..2 OUTBOUND @startUser friendships
          FILTER friend._key != @startUserId  // Excluir al usuario actual
          LET directFriend = FIRST(
            FOR direct IN OUTBOUND @startUser friendships
              FILTER direct._id == friend._id
              RETURN direct
          )
          FILTER directFriend == null  // Excluir amigos directos
          RETURN { 
            name: friend.name, 
            interests: friend.interests, 
          }
      `;


      const cursor = await db.query(query, {
        startUser: `users/${userId}`,
        startUserId: userId,
      });

      const results = await cursor.all();

      return results;
    } catch (err) {
      console.error("Error executing query:", err);
      return [];
    }
}

export default getFriendRecommendations;
