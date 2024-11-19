import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Crear un rol para los usuarios
  const rolUsuario = await prisma.rol.create({
    data: {
      nombre: "Estudiante",
      descripcion: "Usuario con acceso a cuestionarios y resultados"
    }
  });

  // Crear un usuario
  const usuario1 = await prisma.usuario.create({
    data: {
      nombre_usuario: "johndoe",
      email: "johndoe@example.com",
      contrasena: "securepassword123",
      rol_id: rolUsuario.id
    }
  });

  // Crear un cuestionario
  const cuestionario = await prisma.cuestionario.create({
    data: {
      nombre: "Cuestionario de Estilos de Aprendizaje",
      descripcion:
        "Un cuestionario para identificar los estilos de aprendizaje",
      tipo: "Kolb"
    }
  });

  // Crear una pregunta
  const pregunta1 = await prisma.pregunta.create({
    data: {
      cuestionario_id: cuestionario.id,
      enunciado: "¿Te gusta aprender a través de la experiencia práctica?",
      tipo_pregunta: "Ipsativa"
    }
  });

  // Crear opciones para la pregunta
  await prisma.opcion.create({
    data: {
      pregunta_id: pregunta1.id,
      texto: "Sí"
    }
  });

  await prisma.opcion.create({
    data: {
      pregunta_id: pregunta1.id,
      texto: "No"
    }
  });

  // Crear un estudiante
  const estudiante1 = await prisma.estudiante.create({
    data: {
      usuario_id: usuario1.id,
      nombre_completo: "John Doe",
      fecha_nacimiento: new Date("2000-01-01"),
      grupo_etnico: "Caucásico"
    }
  });

  // Crear una respuesta
  await prisma.respuestaEstudiante.create({
    data: {
      estudiante_id: estudiante1.id,
      pregunta_id: pregunta1.id,
      opcion_id: 1, // Suponiendo que el estudiante eligió la opción 'Sí'
      usuario_id: usuario1.id
    }
  });

  console.log("Base de datos poblada con éxito");
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
