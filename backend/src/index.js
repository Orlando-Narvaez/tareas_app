// src/index.js

import express from "express";
import tareaRoutes from "./routes/tareaRoutes.js";

const app = express();
const PORT = 3001;

// Middleware para leer JSON
app.use(express.json());

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API de Tareas!");
});

// Rutas de tareas
app.use("/api/tareas", tareaRoutes);

// Levantar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
