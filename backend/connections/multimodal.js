import { Database } from "arangojs";

// Configurar la conexión con ArangoDB
const db = new Database({
  url: "http://54.208.181.222:8529", // Cambia esto por la URL de tu ArangoDB si es diferente
});
db.useBasicAuth("root", "12345678");  
db.userDatabases("_system");  // Reemplaza con el nombre de tu base de datos

// Función para obtener amigos de los amigos filtrados por intereses
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

      // Ejecutar la consulta con parámetros
      const cursor = await db.query(query, {
        startUser: `users/${userId}`,
        startUserId: userId,
      });

      // Obtener los resultados
      const results = await cursor.all();

      return results;
    } catch (err) {
      console.error("Error executing query:", err);
      return [];
    }
}

export default getFriendRecommendations;
