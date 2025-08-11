import express from 'express';
import cors from 'cors';
import sequelize from './config/database.js';
import tareaRoutes from './routes/tareaRoutes.js';

const app = express();

// ✅ Habilitar CORS para cualquier origen (en desarrollo)
app.use(cors({
  origin: 'http://localhost:5173', // tu frontend
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());

app.use('/api/tareas', tareaRoutes);

sequelize.sync().then(() => {
  console.log('Base de datos sincronizada');
});

app.listen(3000, () => {
  console.log('Servidor backend corriendo en puerto 3000');
});
