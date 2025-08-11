// src/controllers/tareaController.js
import tareaModel from '../models/tareaModel.js';

export const crearTarea = async (req, res) => {
  try {
    const { titulo } = req.body;
    if (!titulo) {
      return res.status(400).json({ error: 'El título es obligatorio' });
    }

    const tareaExistente = await tareaModel.findOne({ where: { titulo } });
    if (tareaExistente) {
      return res.status(400).json({ error: 'Ya existe una tarea con este título' });
    }

    const nuevaTarea = await tareaModel.create({ titulo });
    return res.status(201).json(nuevaTarea);

  } catch (error) {
    console.error('Error al crear tarea:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const obtenerTareas = async (req, res) => {
  try {
    const tareas = await tareaModel.findAll({ order: [['createdAt', 'DESC']] });
    return res.json(tareas);
  } catch (error) {
    console.error('Error al obtener tareas:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const eliminarTarea = async (req, res) => {
  try {
    const { id } = req.params;
    const tarea = await tareaModel.findByPk(id);

    if (!tarea) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }

    await tarea.destroy();
    return res.json({ mensaje: 'Tarea eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar tarea:', error.message);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};