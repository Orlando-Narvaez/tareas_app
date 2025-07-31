import express from "express";
import cors from "cors";
import tareaRoutes from "./routes/tareaRoutes.js";
import sequelize from "./config/database.js";
import "./models/tareaModel.js";

const app = express();
const PORT = 3001;

// ✅ Middleware de CORS
app.use(cors());

// ✅ Middleware para leer JSON
app.use(express.json());

// Ruta base de prueba
app.get("/", (req, res) => {
  res.send("¡Bienvenido a la API de Tareas!");
});

// Rutas de tareas
app.use("/api/tareas", tareaRoutes);

// Conectar y sincronizar base de datos antes de levantar el servidor
sequelize.sync().then(() => {
  console.log("✅ Base de datos sincronizada correctamente");

  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("❌ Error al sincronizar la base de datos:", error);
});