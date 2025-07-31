// src/models/Tarea.js
import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Tarea = sequelize.define("Tarea", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaVencimiento: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  prioridad: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "media",
  },
  completada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

export default Tarea;