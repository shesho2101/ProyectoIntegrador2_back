import { Router } from 'express';
import {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  getReservationsByUser,
  getReservationsByUserAndType,
  getReservationHistoryByUser
} from '../controllers/ReservationController';

import { verifyToken } from '../middlewares/AuthMiddleware';
import { verifyUser } from '../middlewares/CheckUserPermission';
import { verifyAdmin } from '../middlewares/VerifyAdminMiddleware';

const router = Router();

// Crear una nueva reserva (cualquiera autenticado)
router.post('/', verifyToken, createReservation);

// Listar TODAS las reservas (solo admin)
router.get('/', verifyToken, verifyAdmin, getAllReservations);

// Ver una reserva por ID (admin o dueño)
router.get('/:id', verifyToken, getReservationById);

// Actualizar reserva por ID (admin o dueño)
router.put('/:id', verifyToken, updateReservation);

// Eliminar reserva por ID (admin o dueño)
router.delete('/:id', verifyToken, deleteReservation);

// Listar reservas de un usuario (solo ese usuario o admin)
router.get('/user/:usuario_id', verifyToken, verifyUser, getReservationsByUser);

// Filtrar reservas de un usuario por tipo (solo ese usuario o admin)
router.get(
  '/user/:usuario_id/type/:tipo_reserva',
  verifyToken,
  verifyUser,
  getReservationsByUserAndType
);

// Historial completo de un usuario (solo ese usuario o admin)
router.get(
  '/history/:usuario_id',
  verifyToken,
  verifyUser,
  getReservationHistoryByUser
);

export default router;
