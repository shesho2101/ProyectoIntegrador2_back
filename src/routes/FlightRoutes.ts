import { Router } from 'express';
import {
  getFlights,
  getFlightById,
  createFlight,
  updateFlight,
  deleteFlight,
  getFlightsByOrigin,
  getFlightsByDestination,
  getFlightsByPrice
} from '../controllers/FlightController';

const router = Router();

// Obtener todos los vuelos
router.get('/', getFlights);

// Obtener un vuelo por ID
router.get('/:id', getFlightById);

// Crear un nuevo vuelo
router.post('/', createFlight);

// Actualizar un vuelo por ID
router.put('/:id', updateFlight);

// Eliminar un vuelo por ID
router.delete('/:id', deleteFlight);

// Filtrar vuelos por origen
router.get('/origin', getFlightsByOrigin);

// Filtrar vuelos por destino
router.get('/destination', getFlightsByDestination);

// Filtrar vuelos por precio
router.get('/price', getFlightsByPrice);

export default router;
