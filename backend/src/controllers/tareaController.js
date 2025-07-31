// src/controllers/tareaController.js

import Tarea from "../models/Tarea.js";

// ✅ Listar todas las tareas (con ordenamiento opcional por fecha)
export const listar = async (req, res) => {
  try {
    let opciones = {};
    
    if (req.query.orden === "fecha") {
      opciones.order = [["fechaVencimiento", "ASC"]];
    }

    const tareas = await Tarea.findAll(opciones);
    res.json(tareas);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las tareas" });
  }
};

// ✅ Crear una nueva tarea
export const crear = async (req, res) => {
  try {
    const nueva = await Tarea.create(req.body);
    res.status(201).json(nueva);
  } catch (error) {
    res.status(400).json({ error: "Error al crear la tarea" });
  }
};

// ✅ Obtener una tarea por su ID
export const obtener = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
    res.json(tarea);
  } catch (error) {
    res.status(500).json({ error: "Error al buscar la tarea" });
  }
};

// ✅ Editar una tarea por ID
export const editar = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });

    await tarea.update(req.body);
    res.json(tarea);
  } catch (error) {
    res.status(400).json({ error: "Error al actualizar la tarea" });
  }
};

// ✅ Eliminar una tarea por ID
export const eliminar = async (req, res) => {
  try {
    const tarea = await Tarea.findByPk(req.params.id);
    if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });

    await tarea.destroy();
    res.json({ mensaje: "Tarea eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar la tarea" });
  }
};