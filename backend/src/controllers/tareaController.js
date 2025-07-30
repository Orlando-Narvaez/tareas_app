// src/controllers/tareaController.js

import {
  crearTarea,
  obtenerTareas,
  obtenerTareaPorId,
  actualizarTarea,
  eliminarTarea,
} from "../models/tareaModel.js";

export const listar = (req, res) => {
  res.json(obtenerTareas());
};

export const crear = (req, res) => {
  const nueva = crearTarea(req.body);
  res.status(201).json(nueva);
};

export const obtener = (req, res) => {
  const tarea = obtenerTareaPorId(req.params.id);
  if (!tarea) return res.status(404).json({ error: "No encontrada" });
  res.json(tarea);
};

export const editar = (req, res) => {
  const actualizada = actualizarTarea(req.params.id, req.body);
  if (!actualizada) return res.status(404).json({ error: "No encontrada" });
  res.json(actualizada);
};

export const eliminar = (req, res) => {
  const eliminada = eliminarTarea(req.params.id);
  if (!eliminada) return res.status(404).json({ error: "No encontrada" });
  res.json(eliminada);
};