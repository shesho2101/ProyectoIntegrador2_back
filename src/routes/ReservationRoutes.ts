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
} from '../controllers/ReservationController';

const router = Router();

// Crear una nueva reserva
router.post('/', createReservation);

// Obtener todas las reservas
router.get('/', getAllReservations);

// Obtener una reserva por ID
router.get('/:id', getReservationById);

// Actualizar una reserva por ID
router.put('/:id', updateReservation);

// Eliminar una reserva por ID
router.delete('/:id', deleteReservation);

// Filtrar reservas por estado
router.get('/status/:estado', getReservationsByStatus);

// Filtrar reservas por usuario
router.get('/user/:usuario_id', getReservationsByUser);

// Filtrar reservas por tipo
router.get('/type/:tipo_reserva', getReservationsByType);

// Filtrar reservas por fecha de reserva
router.get('/date/:fecha_reserva', getReservationsByDate);

// Filtrar reservas por usuario y tipo
router.get('/user/:usuario_id/type/:tipo_reserva', getReservationsByUserAndType);

export default router;
