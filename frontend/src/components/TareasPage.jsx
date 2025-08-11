import React, { useState } from 'react';
import { useTareas } from '../hooks/useTareas.js';

export const TareasPage = () => {
  const { tareas, error, agregarTarea, eliminarTarea } = useTareas();
  const [titulo, setTitulo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!titulo.trim()) return alert('El título es obligatorio');
    agregarTarea(titulo.trim());
    setTitulo('');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>Gestión de Tareas</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nuevo título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          style={{ width: '80%', padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Agregar</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {tareas.map(t => (
          <li key={t.id} style={{ margin: '10px 0' }}>
            {t.titulo}
            <button
              onClick={() => eliminarTarea(t.id)}
              style={{ marginLeft: 10 }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
