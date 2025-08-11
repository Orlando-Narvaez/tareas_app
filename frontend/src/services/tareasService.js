// src/services/tareasService.js
const API_URL = 'http://localhost:3000/tareas';

async function obtenerTareas() {
  const res = await fetch(API_URL);
  return await res.json();
}

async function crearTarea(tarea) {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tarea),
  });
  return await res.json();
}

async function eliminarTarea(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
}

const tareasService = {
  obtenerTareas,
  crearTarea,
  eliminarTarea
};

export default tareasService;
