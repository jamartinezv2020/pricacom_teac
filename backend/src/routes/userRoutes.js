// src/routes/userRoutes.ts
import { Router } from "express";
import { updateUser, getUsers } from "../controllers/userController";
const router = Router();
// Ruta para obtener todos los usuarios
router.get("/users", getUsers);
// Ruta para actualizar un usuario
router.put("/users/:userId", updateUser);
export default router;
