// src/config/database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false // Evita mostrar logs de SQL en consola, útil para mantener limpio el output
});

try {
  await sequelize.authenticate();
  console.log('✅ Conexión a la base de datos establecida correctamente.');
} catch (error) {
  console.error('❌ Error al conectar con la base de datos:', error);
}

export default sequelize;