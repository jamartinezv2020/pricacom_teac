import { prisma } from "../utils/prismaClient";
import bcrypt from "bcryptjs";
// Crear un nuevo usuario
export const createUser = async (req, res) => {
    const { nombre_usuario, email, contrasena, rol_id } = req.body;
    try {
        // Validar si el usuario ya existe
        const existingUser = await prisma.usuario.findUnique({
            where: { email }
        });
        if (existingUser) {
            return res.status(400).json({ error: "El usuario ya está registrado" });
        }
        // Hashear la contraseña antes de guardar
        const hashedPassword = await bcrypt.hash(contrasena, 10);
        const newUser = await prisma.usuario.create({
            data: {
                nombre_usuario,
                email,
                contrasena: hashedPassword,
                rol_id
            }
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
};
// Obtener todos los usuarios
export const getUsers = async (req, res) => {
    try {
        const users = await prisma.usuario.findMany({
            include: {
                rol: true,
                respuestas_estudiante: true,
                resultados_cuestionario: true
            }
        });
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
};
// Obtener un usuario por ID
export const getUserById = async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    try {
        const user = await prisma.usuario.findUnique({
            where: { id: userId },
            include: {
                rol: true,
                respuestas_estudiante: true,
                resultados_cuestionario: true
            }
        });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        res.json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el usuario" });
    }
};
// Actualizar información del usuario
export const updateUser = async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    const { nombre_usuario, email, contrasena, rol_id } = req.body;
    try {
        // Hashear la nueva contraseña si se proporciona
        let hashedPassword;
        if (contrasena) {
            hashedPassword = await bcrypt.hash(contrasena, 10);
        }
        const updatedUser = await prisma.usuario.update({
            where: { id: userId },
            data: {
                nombre_usuario,
                email,
                contrasena: hashedPassword || undefined,
                rol_id
            }
        });
        res.json(updatedUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el usuario" });
    }
};
// Eliminar un usuario por ID
export const deleteUser = async (req, res) => {
    const userId = parseInt(req.params.userId, 10);
    try {
        await prisma.usuario.delete({
            where: { id: userId }
        });
        res.status(204).send(); // No content
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el usuario" });
    }
};
