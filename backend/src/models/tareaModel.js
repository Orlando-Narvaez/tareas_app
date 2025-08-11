// src/models/tareaModel.js

import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const tareaModel = sequelize.define('Tarea', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El título es obligatorio'
      }
    }
  }
}, {
  tableName: 'tareas',
  timestamps: true,
});

export default tareaModel;