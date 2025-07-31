import express from "express";
import Tarea from "../models/Tarea.js";

const router = express.Router();

// Obtener todas las tareas
router.get("/", async (req, res) => {
  try {
    const tareas = await Tarea.findAll();
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tareas" });
  }
});

// Crear una nueva tarea
router.post("/", async (req, res) => {
  try {
    const { nombre, fechaVencimiento, prioridad } = req.body;

    const nuevaTarea = await Tarea.create({
      nombre,
      fechaVencimiento,
      prioridad,
      completada: false, // por defecto
    });

    res.status(201).json(nuevaTarea);
  } catch (error) {
    res.status(400).json({ error: "Error al crear tarea" });
  }
});

// Obtener una tarea por ID
router.get("/:id", async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener tarea" });
  }
});

// Actualizar una tarea
router.put("/:id", async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });

    const { nombre, fechaVencimiento, prioridad, completada } = req.body;

    tarea.nombre = nombre ?? tarea.nombre;
    tarea.fechaVencimiento = fechaVencimiento ?? tarea.fechaVencimiento;
    tarea.prioridad = prioridad ?? tarea.prioridad;
    tarea.completada = completada ?? tarea.completada;

    await tarea.save();
    res.json(tarea);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar tarea" });
  }
});

// Eliminar una tarea
router.delete("/:id", async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });

    await tarea.destroy();
    res.json({ mensaje: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar tarea" });
  }
});

export default router;