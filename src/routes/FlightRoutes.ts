// ✅ routes/FlightRoutes.ts
import express from 'express';
import {
  getFilteredFlights,
  getAllFlights
} from '../controllers/FlightController';

const router = express.Router();

// Ruta para obtener todos los vuelos sin filtros
router.get('/', getAllFlights);

// Ruta para obtener vuelos filtrados
router.get('/filtrados', getFilteredFlights);

export default router;
