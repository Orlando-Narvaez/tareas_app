import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tareas, setTareas] = useState([]);
  const [nombre, setNombre] = useState("");

  // Cargar tareas al inicio
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/tareas")
      .then((res) => setTareas(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Crear nueva tarea
  const crearTarea = async (e) => {
    e.preventDefault();
    if (nombre.trim() === "") return;

    try {
      const res = await axios.post("http://localhost:3001/api/tareas", {
        nombre,
      });
      setTareas([...tareas, res.data]);
      setNombre("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Lista de Tareas</h1>

      <form onSubmit={crearTarea}>
        <input
          type="text"
          placeholder="Nueva tarea"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {tareas.map((tarea) => (
          <li key={tarea.id}>{tarea.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;