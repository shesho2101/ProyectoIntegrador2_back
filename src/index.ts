// index.ts - Inicio del servidor
import cors from 'cors';
import app from './app';

import connectMongo from './config/MongoProvider';
app.use(cors());

const PORT = process.env.PORT || 3002;

const startServer = async () => {
  await connectMongo();
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  });

  // Manejo de errores del servidor
  app.on('error', (err: any) => {
    console.error('Error al iniciar el servidor:', err);
  });

};


startServer();
