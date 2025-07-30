import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tareas, setTareas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [fechaVencimiento, setFechaVencimiento] = useState("");
  const [prioridad, setPrioridad] = useState("media");
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");
  const [fechaEditada, setFechaEditada] = useState("");
  const [prioridadEditada, setPrioridadEditada] = useState("media");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/tareas")
      .then((res) => setTareas(res.data))
      .catch((err) => console.error(err));
  }, []);

  const crearTarea = async (e) => {
    e.preventDefault();
    if (nombre.trim() === "") return;

    try {
      const res = await axios.post("http://localhost:3001/api/tareas", {
        nombre,
        fechaVencimiento,
        prioridad,
      });
      setTareas([...tareas, res.data]);
      setNombre("");
      setFechaVencimiento("");
      setPrioridad("media");
    } catch (err) {
      console.error(err);
    }
  };

  const actualizarTarea = async (id, cambios = {}) => {
    try {
      const res = await axios.put(`http://localhost:3001/api/tareas/${id}`, cambios);
      setTareas(tareas.map((tarea) => (tarea.id === id ? res.data : tarea)));
      setEditandoId(null);
      setNombreEditado("");
      setFechaEditada("");
      setPrioridadEditada("media");
    } catch (err) {
      console.error(err);
    }
  };

  const eliminarTarea = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/tareas/${id}`);
      setTareas(tareas.filter((tarea) => tarea.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const tareasOrdenadas = [...tareas]
    .filter((tarea) =>
      tarea.nombre.toLowerCase().includes(busqueda.toLowerCase())
    )
    .sort((a, b) => {
      if (!a.fechaVencimiento) return 1;
      if (!b.fechaVencimiento) return -1;
      return new Date(a.fechaVencimiento) - new Date(b.fechaVencimiento);
    });

  const tareasPendientes = tareasOrdenadas.filter((tarea) => !tarea.completada);
  const tareasCompletadas = tareasOrdenadas.filter((tarea) => tarea.completada);

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
        <input
          type="date"
          value={fechaVencimiento}
          onChange={(e) => setFechaVencimiento(e.target.value)}
        />
        <select
          value={prioridad}
          onChange={(e) => setPrioridad(e.target.value)}
        >
          <option value="alta">Alta</option>
          <option value="media">Media</option>
          <option value="baja">Baja</option>
        </select>
        <button type="submit">Agregar</button>
      </form>

      <input
        type="text"
        placeholder="Buscar tarea..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        style={{
          marginTop: "1rem",
          marginBottom: "1rem",
          padding: "0.5rem",
          width: "100%",
        }}
      />

      <h2>Tareas Pendientes</h2>
      <ul>
        {tareasPendientes.map((tarea) => (
          <li key={tarea.id}>
            {editandoId === tarea.id ? (
              <>
                <input
                  type="text"
                  value={nombreEditado}
                  onChange={(e) => setNombreEditado(e.target.value)}
                />
                <input
                  type="date"
                  value={fechaEditada}
                  onChange={(e) => setFechaEditada(e.target.value)}
                />
                <select
                  value={prioridadEditada}
                  onChange={(e) => setPrioridadEditada(e.target.value)}
                >
                  <option value="alta">Alta</option>
                  <option value="media">Media</option>
                  <option value="baja">Baja</option>
                </select>
                <button onClick={() => actualizarTarea(tarea.id, {
                  nombre: nombreEditado,
                  fechaVencimiento: fechaEditada,
                  prioridad: prioridadEditada,
                })}>Guardar</button>
                <button onClick={() => setEditandoId(null)}>Cancelar</button>
              </>
            ) : (
              <>
                <strong>{tarea.nombre}</strong>
                {tarea.fechaVencimiento && (
                  <span style={{ marginLeft: "10px", color: "gray" }}>
                    (Vence: {tarea.fechaVencimiento})
                  </span>
                )}
                <span style={{ marginLeft: "10px" }}>
                  Prioridad: <strong>{tarea.prioridad}</strong>
                </span>
                <button
                  onClick={() => eliminarTarea(tarea.id)}
                  style={{ marginLeft: "10px" }}
                >
                  ❌
                </button>
                <button
                  onClick={() => {
                    setEditandoId(tarea.id);
                    setNombreEditado(tarea.nombre);
                    setFechaEditada(tarea.fechaVencimiento || "");
                    setPrioridadEditada(tarea.prioridad || "media");
                  }}
                  style={{ marginLeft: "5px" }}
                >
                  ✏️
                </button>
                <button
                  onClick={() =>
                    actualizarTarea(tarea.id, { completada: true })
                  }
                  style={{ marginLeft: "5px" }}
                >
                  ✔️
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      <h2 style={{ marginTop: "2rem" }}>Tareas Completadas</h2>
      <ul>
        {tareasCompletadas.map((tarea) => (
          <li key={tarea.id}>
            ✅ <strong>{tarea.nombre}</strong>
            <button
              onClick={() =>
                actualizarTarea(tarea.id, { completada: false })
              }
              style={{ marginLeft: "5px" }}
            >
              ↩️
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;