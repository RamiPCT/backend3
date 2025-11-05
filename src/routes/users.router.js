// src/routes/users.router.js
import { Router } from "express";
import { UserModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

const router = Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Gestión de usuarios
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         role:
 *           type: string
 *           enum: [user, admin]
 *         password:
 *           type: string
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Listar usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find().lean();
    res.json({ status: "success", payload: users });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [Users]
 */
router.get("/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).lean();
    if (!user) {
      return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
    }
    res.json({ status: "success", payload: user });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear usuario (hashea la contraseña)
 *     tags: [Users]
 */
router.post("/", async (req, res) => {
  try {
    const body = { ...req.body };
    if (body.password) body.password = await bcrypt.hash(body.password, 10);
    const created = await UserModel.create(body);
    res.status(201).json({ status: "success", payload: created });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Actualizar usuario
 *     tags: [Users]
 */
router.put("/:id", async (req, res) => {
  try {
    const updated = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true }).lean();
    if (!updated) {
      return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
    }
    res.json({ status: "success", payload: updated });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Eliminar usuario
 *     tags: [Users]
 */
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await UserModel.findByIdAndDelete(req.params.id).lean();
    if (!deleted) {
      return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
    }
    res.json({ status: "success", message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;
