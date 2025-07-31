// src/config/database.js
import { Sequelize } from "sequelize";

// Conexión a SQLite (puedes cambiar el nombre del archivo si quieres)
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "src/database/database.sqlite", // Ruta donde se guardará el archivo de BD
});

export default sequelize;