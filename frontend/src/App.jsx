import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tareas, setTareas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");


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

  // Actualizar tarea
  const actualizarTarea = async (id) => {
    try {
      const res = await axios.put(`http://localhost:3001/api/tareas/${id}`, {
        nombre: nombreEditado,
      });

      setTareas(tareas.map((tarea) =>
        tarea.id === id ? res.data : tarea
      ));
      setEditandoId(null);
      setNombreEditado("");
    } catch (err) {
      console.error(err);
    }
  };

  // Eliminar tarea
  const eliminarTarea = async (id) => {
    console.log("Eliminando tarea con ID:", id); // ← línea de prueba
    try {
      await axios.delete(`http://localhost:3001/api/tareas/${id}`);
      setTareas(tareas.filter((tarea) => tarea.id !== id));
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
          <li key={tarea.id}>
            {editandoId === tarea.id ? (
              <>
                <input
                  type="text"
                  value={nombreEditado}
                  onChange={(e) => setNombreEditado(e.target.value)}
                />
                <button onClick={() => actualizarTarea(tarea.id)}>Guardar</button>
                <button onClick={() => setEditandoId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                {tarea.nombre}
                <button onClick={() => eliminarTarea(tarea.id)} style={{ marginLeft: "10px" }}>
                  ❌
                </button>
                <button
                  onClick={() => {
                    setEditandoId(tarea.id);
                    setNombreEditado(tarea.nombre);
                  }}
                  style={{ marginLeft: "5px" }}
                >
                  ✏️
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;