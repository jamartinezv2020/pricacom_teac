import { Client } from "pg";

async function checkConnection() {
  const client = new Client({
    user: "your_user", // Usuario de la base de datos
    host: "localhost", // Host (por lo general localhost si está en el mismo servidor)
    database: "your_db", // Nombre de la base de datos
    password: "your_pass", // Contraseña de la base de datos
    port: 5432 // Puerto en el que PostgreSQL está escuchando (por defecto 5432)
  });

  try {
    // Intentamos conectar a la base de datos
    await client.connect();
    console.log("Conexión exitosa a la base de datos");

    // Aquí también podrías agregar una consulta para asegurarte de que la base de datos responde correctamente
    const res = await client.query("SELECT NOW();"); // Consulta simple para verificar que la base de datos responde
    console.log("Respuesta de la base de datos:", res.rows[0]);
  } catch (err) {
    // Si ocurre un error en la conexión, lo mostramos
    console.error("Error de conexión a la base de datos:", err);
  } finally {
    // Cerramos la conexión cuando termine
    await client.end();
  }
}

checkConnection();
