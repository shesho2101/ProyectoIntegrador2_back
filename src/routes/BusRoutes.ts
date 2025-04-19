import { Router } from 'express';
import { getBuses, getBusById, createBus, updateBus, deleteBus, getBusesByOrigin, getBusesByDestination, getBusesByPrice, getBusesByDepartureTime, getBusesByType } from '../controllers/BusController';
import { verifyToken } from '../middlewares/AuthMiddleware';
import { verifyAdmin } from '../middlewares/VerifyAdminMiddleware';

const router = Router();

// Obtener todos los buses
router.get('/', getBuses);

// Obtener un bus por ID
router.get('/:id', getBusById);

// Crear un nuevo bus (Solo Admin)
router.post('/', verifyToken, verifyAdmin, createBus);

// Actualizar un bus por ID (Solo Admin)
router.put('/:id', verifyToken, verifyAdmin, updateBus);

// Eliminar un bus por ID (Solo Admin)
router.delete('/:id', verifyToken, verifyAdmin, deleteBus);

// Filtrar buses por origen
router.get('/origin', getBusesByOrigin);

// Filtrar buses por destino
router.get('/destination', getBusesByDestination);

// Filtrar buses por precio
router.get('/price', getBusesByPrice);

// Filtrar buses por fecha de salida
router.get('/departure-time', getBusesByDepartureTime);

// Filtrar buses por tipo
router.get('/type', getBusesByType);

export default router;
