import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectMongo from './config/MongoProvider';
import { errorHandler } from './middlewares/ErrorMiddleware';
import authRoutes from './routes/AuthRoutes';
import busRoutes from './routes/BusRoutes';  
import hotelRoutes from './routes/HotelRoutes';  
import flightRoutes from './routes/FlightRoutes';  
import reservationRoutes from './routes/ReservationRoutes';
import favoritesRoutes from './routes/FavoriteRoutes';


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
app.use('/api/buses', busRoutes);  
app.use('/api/hotels', hotelRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/favorites', favoritesRoutes);


// Middleware de manejo de errores
app.use(errorHandler);

export default app;
