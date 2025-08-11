import { useState } from "react";
import { useTareas } from "../hooks/useTareas";

export default function TareasPage() {
  const { tareas, agregarTarea, eliminarTarea } = useTareas();
  const [nuevaTarea, setNuevaTarea] = useState("");
  const [descripcion, setDescripcion] = useState("");

  const handleAgregar = async () => {
    if (!nuevaTarea.trim()) return;
    await agregarTarea({
      titulo: nuevaTarea,
      descripcion: descripcion.trim() || ""
    });
    setNuevaTarea("");
    setDescripcion("");
  };

  return (
    <div>
      <h1>Lista de Tareas</h1>

      <input
        type="text"
        value={nuevaTarea}
        onChange={(e) => setNuevaTarea(e.target.value)}
        placeholder="Título de la tarea"
      />

      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Descripción (opcional)"
      />

      <button onClick={handleAgregar}>Agregar</button>

      <ul>
        {tareas.map((t) => (
          <li key={t.id}>
            <strong>{t.titulo}</strong> — {t.descripcion || "Sin descripción"}
            <button onClick={() => eliminarTarea(t.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
