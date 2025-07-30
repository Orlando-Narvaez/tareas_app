// src/models/tareaModel.js

let tareas = [];
let id = 1;

export function crearTarea(data) {
  const nueva = {
    id: id++,
    nombre: data.nombre || "",
    prioridad: data.prioridad || "Media",
    fechaVencimiento: data.fechaVencimiento || null,
    completada: false,
  };
  tareas.push(nueva);
  return nueva;
}

export function obtenerTareas() {
  return tareas;
}

export function obtenerTareaPorId(id) {
  return tareas.find((t) => t.id === Number(id));
}

export function actualizarTarea(id, data) {
  const index = tareas.findIndex((t) => t.id === Number(id));
  if (index === -1) return null;

  tareas[index] = {
    ...tareas[index],
    ...data,
  };
  return tareas[index];
}

export function eliminarTarea(id) {
  const index = tareas.findIndex((t) => t.id === Number(id));
  if (index === -1) return null;
  const eliminada = tareas[index];
  tareas.splice(index, 1);
  return eliminada;
}