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
import { verifyToken } from '../middlewares/AuthMiddleware';  // Para asegurar que el usuario esté logueado
import { verifyAdmin } from '../middlewares/VerifyAdminMiddleware';  // Para asegurar que el usuario sea admin

const router = Router();

// Obtener todos los vuelos
router.get('/', getFlights);  // Público

// Obtener un vuelo por ID
router.get('/:id', getFlightById);  // Público

// Crear un nuevo vuelo (Solo Admin)
router.post('/', verifyToken, verifyAdmin, createFlight);

// Actualizar un vuelo por ID (Solo Admin)
router.put('/:id', verifyToken, verifyAdmin, updateFlight);

// Eliminar un vuelo por ID (Solo Admin)
router.delete('/:id', verifyToken, verifyAdmin, deleteFlight);

// Filtrar vuelos por origen
router.get('/origin', getFlightsByOrigin);  // Público

// Filtrar vuelos por destino
router.get('/destination', getFlightsByDestination);  // Público

// Filtrar vuelos por precio
router.get('/price', getFlightsByPrice);  // Público

export default router;
