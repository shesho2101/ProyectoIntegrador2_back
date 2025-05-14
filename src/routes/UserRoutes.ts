import { Router } from 'express';
import { getUser, updateUser, getFavorites, getReservations } from '../controllers/UserController';
import { verifyToken } from '../middlewares/AuthMiddleware';

const router = Router();

// Obtener datos del usuario
router.get('/:id', verifyToken, getUser);

// Actualizar datos del usuario
router.put('/:id', verifyToken, updateUser);

// Obtener los favoritos del usuario
router.get('/:id/favorites', verifyToken, getFavorites);

// Obtener las reservas del usuario
router.get('/:id/reservations', verifyToken, getReservations);  // Esta es la ruta para obtener las reservas

export default router;
