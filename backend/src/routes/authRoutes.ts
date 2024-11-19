// src/routes/authRoutes.ts
import { Router } from "express";
import { register, login } from "../controllers/authController"; // Asegúrate de que estas funciones existan

const router = Router();

// Rutas para la autenticación
router.post("/register", async (req, res) => {
  try {
    await register(req, res); // Llama a la función de register
  } catch (error) {
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
});

router.post("/login", async (req, res) => {
  try {
    await login(req, res); // Llama a la función de login
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

export default router;
