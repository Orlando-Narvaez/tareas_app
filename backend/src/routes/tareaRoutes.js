// src/routes/tareaRoutes.js
import express from 'express';
import { crearTarea, obtenerTareas, eliminarTarea } from '../controllers/tareaController.js';

const router = express.Router();

router.post('/', crearTarea);
router.get('/', obtenerTareas);
router.delete('/:id', eliminarTarea);

export default router;