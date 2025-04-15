import { Router } from 'express';
import {
  getBuses,
  getBusById,
  createBus,
  updateBus,
  deleteBus,
  getBusesByOrigin,
  getBusesByDestination,
  getBusesByPrice,
  getBusesByDepartureTime,
  getBusesByType
} from '../controllers/BusController';

const router = Router();

// Obtener todos los buses
router.get('/', getBuses);

// Obtener un bus por ID
router.get('/:id', getBusById);

// Crear un nuevo bus
router.post('/', createBus);

// Actualizar un bus por ID
router.put('/:id', updateBus);

// Eliminar un bus por ID
router.delete('/:id', deleteBus);

// Filtrar buses por origen
router.get('/origin', getBusesByOrigin);

// Filtrar buses por destino
router.get('/destination', getBusesByDestination);

// Filtrar buses por precio
router.get('/price', getBusesByPrice);

// Filtrar buses por fecha de salida
router.get('/departure-time', getBusesByDepartureTime);

// Filtrar buses por tipo de bus (Ejecutivo, Económico, etc.)
router.get('/type', getBusesByType);

export default router;
