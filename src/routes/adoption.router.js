// src/routes/adoption.router.js
import { Router } from "express";

const router = Router();

// Rutas simples en memoria para tests funcionales
const adoptions = [];

// GET /api/adoptions
router.get("/", (req, res) => {
  res.json({ status: "success", payload: adoptions });
});

// GET /api/adoptions/:id
router.get("/:id", (req, res) => {
  const adoption = adoptions.find((a) => a.id === req.params.id);
  if (!adoption) return res.status(404).json({ status: "error", message: "No encontrada" });
  res.json({ status: "success", payload: adoption });
});

// POST /api/adoptions
router.post("/", (req, res) => {
  const newAdoption = { id: String(Date.now()), ...req.body };
  adoptions.push(newAdoption);
  res.status(201).json({ status: "success", payload: newAdoption });
});

// PUT /api/adoptions/:id
router.put("/:id", (req, res) => {
  const idx = adoptions.findIndex((a) => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ status: "error", message: "No encontrada" });
  adoptions[idx] = { ...adoptions[idx], ...req.body };
  res.json({ status: "success", payload: adoptions[idx] });
});

// DELETE /api/adoptions/:id
router.delete("/:id", (req, res) => {
  const idx = adoptions.findIndex((a) => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ status: "error", message: "No encontrada" });
  adoptions.splice(idx, 1);
  res.json({ status: "success", message: "Eliminada correctamente" });
});

export default router;
