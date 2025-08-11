import { useState, useEffect } from 'react';
import axios from 'axios';

export const useTareas = () => {
  const [tareas, setTareas] = useState([]);
  const [error, setError] = useState(null);

  // Obtener tareas
  const obtenerTareas = async () => {
    try {
      const res = await axios.get('http://localhost:3000/api/tareas');
      setTareas(res.data);
    } catch (err) {
      setError(err.message);
    }
  };

  // Agregar tarea
  const agregarTarea = async (titulo) => {
    try {
      const res = await axios.post('http://localhost:3000/api/tareas', { titulo });
      setTareas([res.data, ...tareas]);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    }
  };

  // Eliminar tarea
  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/tareas/${id}`);
      setTareas(tareas.filter(t => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    obtenerTareas();
  }, []);

  return { tareas, error, agregarTarea, eliminarTarea };
};