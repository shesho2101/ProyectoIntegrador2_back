import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectMongo from './config/MongoProvider';
import { errorHandler } from './middlewares/ErrorMiddleware';
import authRoutes from './routes/AuthRoutes';
import userRoutes from './routes/UserRoutes';
import reservationRoutes from './routes/ReservationRoutes';
import busRoutes from './routes/BusRoutes';  // Importa las rutas de buses
import hotelRoutes from './routes/HotelRoutes';  // Importa las rutas de hoteles
import flightRoutes from './routes/FlightRoutes';  // Importa las rutas de vuelos

dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
  credentials: true,
}));
app.use(morgan('dev'));

// Conexión a la base de datos
connectMongo();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/buses', busRoutes);  
app.use('/api/hotels', hotelRoutes);
app.use('/api/flights', flightRoutes);

// Middleware de manejo de errores
app.use(errorHandler);

export default app;
