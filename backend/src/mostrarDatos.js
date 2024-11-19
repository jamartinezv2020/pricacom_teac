import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function mostrarDatos() {
    try {
        const usuarios = await prisma.usuario.findMany();
        console.log("Usuarios:", usuarios);
        const estudiantes = await prisma.estudiante.findMany();
        console.log("Estudiantes:", estudiantes);
        const roles = await prisma.rol.findMany();
        console.log("Roles:", roles);
        const cuestionarios = await prisma.cuestionario.findMany();
        console.log("Cuestionarios:", cuestionarios);
        const preguntas = await prisma.pregunta.findMany();
        console.log("Preguntas:", preguntas);
        const opciones = await prisma.opcion.findMany();
        console.log("Opciones:", opciones);
        const respuestas = await prisma.respuestaEstudiante.findMany();
        console.log("Respuestas de Estudiantes:", respuestas);
        const resultados = await prisma.resultadoCuestionario.findMany();
        console.log("Resultados de Cuestionarios:", resultados);
        const autenticaciones = await prisma.autenticacion2FA.findMany();
        console.log("Autenticaciones 2FA:", autenticaciones);
    }
    catch (error) {
        console.error("Error al obtener los datos:", error);
    }
    finally {
        await prisma.$disconnect();
    }
}
mostrarDatos();
