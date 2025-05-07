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
import favoritesRoutes from './routes/FavoriteRoutes';
import opinionsRoutes from './routes/OpinionRoutes';
import cartRoutes from './routes/CartRoutes';


dotenv.config();

const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://wayra.up.railway.app'
  ],
  credentials: true
}));
     
app.use(morgan('dev'));

// Conexión a la base de datos
connectMongo();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/buses', busRoutes);  
app.use('/api/hotels', hotelRoutes);
app.use('/api/flights', flightRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/opinions', opinionsRoutes);
app.use('/api/cart', cartRoutes)


// Middleware de manejo de errores
app.use(errorHandler);

export default app;
