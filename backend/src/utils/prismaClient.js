import { PrismaClient } from '@prisma/client';
// Crea una única instancia del cliente Prisma
const prisma = new PrismaClient();
// Conectar el cliente de Prisma a la base de datos
async function connect() {
    try {
        await prisma.$connect();
        console.log('Conexión a la base de datos establecida');
    }
    catch (error) {
        console.error('Error al conectar con la base de datos:', error);
        process.exit(1); // Finaliza el proceso en caso de error
    }
}
// Cierra la conexión de Prisma cuando la aplicación termina
async function disconnect() {
    await prisma.$disconnect();
}
// Exporta el cliente Prisma para usarlo en otros archivos
export { prisma, connect, disconnect };
