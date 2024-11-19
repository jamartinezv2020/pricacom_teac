import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
    try {
        // Intenta conectarse a la base de datos
        await prisma.$connect();
        console.log("Conexión exitosa a la base de datos.");
        // Aquí puedes agregar una consulta o interacción con la base de datos.
        // Como ejemplo, obtenemos el número de usuarios en la tabla "Usuario"
        const usersCount = await prisma.usuario.count();
        console.log(`Hay ${usersCount} usuarios en la base de datos.`);
    }
    catch (error) {
        console.error("Error al conectar a la base de datos:", error);
    }
    finally {
        // Cierra la conexión con la base de datos
        await prisma.$disconnect();
    }
}
main().catch((e) => {
    console.error("Error inesperado:", e);
    process.exit(1);
});
