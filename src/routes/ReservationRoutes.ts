// src/routes/ReservationRoutes.ts
import { Router } from 'express';
import {
  createReservation,
  getAllReservations,
  getReservationById,
  updateReservation,
  deleteReservation,
  getReservationsByStatus,
  getReservationsByUser,
  getReservationsByType,
  getReservationsByDate,
  getReservationsByUserAndType,
  getReservationHistoryByUser,
} from '../controllers/ReservationController';

import { verifyToken } from '../middlewares/AuthMiddleware';
import { verifyUser } from '../middlewares/CheckUserPermission';

const router = Router();

// Crear una nueva reserva (usuario debe estar autenticado y ser el dueño)
router.post('/', verifyToken, createReservation);

// Obtener todas las reservas (solo admin luego puede ver todas)
router.get('/', verifyToken, getAllReservations);

// Obtener una reserva por ID (debe hacerse la verificación en el controller para verificar que es suya)
router.get('/:id', verifyToken, getReservationById);

// Actualizar una reserva por ID (con verificación en el controller)
router.put('/:id', verifyToken, updateReservation);

// Eliminar una reserva por ID (con verificación en el controller)
router.delete('/:id', verifyToken, deleteReservation);

// Filtrar reservas por estado (uso administrativo)
router.get('/status/:estado', verifyToken, getReservationsByStatus);

// Filtrar reservas por usuario (solo el usuario puede acceder)
router.get('/user/:usuario_id', verifyToken, verifyUser, getReservationsByUser);

// Filtrar reservas por tipo (público)
router.get('/type/:tipo_reserva', verifyToken, getReservationsByType);

// Filtrar reservas por fecha de reserva (público)
router.get('/date/:fecha_reserva', verifyToken, getReservationsByDate);

// Filtrar reservas por usuario y tipo (usuario autenticado)
router.get('/user/:usuario_id/type/:tipo_reserva', verifyToken, verifyUser, getReservationsByUserAndType);

// Historial de reservas del usuario
router.get('/history/:usuario_id', verifyToken, verifyUser, getReservationHistoryByUser);

export default router;
