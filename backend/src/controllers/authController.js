import { prisma } from "../utils/prismaClient";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Ejemplo de una función de registro de usuario
export const register = async (req, res) => {
    const { nombre_usuario, email, password } = req.body;
    try {
        // Verificar si el usuario ya existe
        const existingUser = await prisma.usuario.findUnique({
            where: { email }
        });
        if (existingUser) {
            return res.status(400).json({ error: "El usuario ya existe" });
        }
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);
        // Crear nuevo usuario
        const newUser = await prisma.usuario.create({
            data: {
                nombre_usuario,
                email,
                contrasena: hashedPassword
            }
        });
        res.status(201).json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: "Error al registrar el usuario" });
    }
};
// Función de inicio de sesión
export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await prisma.usuario.findUnique({
            where: { email }
        });
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        // Comparar contraseñas
        const isPasswordValid = await bcrypt.compare(password, user.contrasena);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }
        // Generar token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });
        res.json({ token });
    }
    catch (error) {
        res.status(500).json({ error: "Error al iniciar sesión" });
    }
};
