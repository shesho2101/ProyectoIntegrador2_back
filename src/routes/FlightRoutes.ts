import { Router } from 'express';
import {
  getFlights,
  getFlightById,
  createFlight,
  updateFlight,
  deleteFlight,
  getFlightsByOrigin,
  getFlightsByDestination,
  getFlightsByPriceRange
} from '../controllers/FlightController';
import { verifyToken } from '../middlewares/AuthMiddleware';
import { verifyAdmin } from '../middlewares/VerifyAdminMiddleware';

const router = Router();

// Público: todos los vuelos
router.get('/', getFlights);

// Público: un vuelo por ID
router.get('/:id', getFlightById);

// Solo Admin: crear, actualizar y borrar
router.post('/', verifyToken, verifyAdmin, createFlight);
router.put('/:id', verifyToken, verifyAdmin, updateFlight);
router.delete('/:id', verifyToken, verifyAdmin, deleteFlight);

// Filtros públicos por parámetro en la URL
router.get('/origin/:origen', getFlightsByOrigin);
router.get('/destination/:destino', getFlightsByDestination);
router.get('/price/:min/:max', getFlightsByPriceRange);

export default router;
