import { Request, Response } from 'express';
import Reservation from '../models/ReservationModel';  // Sequelize
import ReservationService from '../services/ReservationService';

const ALLOWED_TYPES = ['hotel', 'vuelo', 'bus'] as const;
type ReservaTipo = typeof ALLOWED_TYPES[number];

const canAccess = (reservation: any, user: any) => {
  return user.rol === 'admin' || reservation.usuario_id === user.id;
};

// Crear reserva (usa ID del token, ignora usuario_id del body)
export const createReservation = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const data = { ...req.body, usuario_id: user.id };
    const nueva = await ReservationService.createReservation(data);
    res.status(201).json(nueva);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear la reserva' });
  }
};

// Listar todas (solo admin)
export const getAllReservations = async (_req: Request, res: Response) => {
  try {
    const all = await ReservationService.getAllReservations();
    res.json(all);
  } catch {
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
};

// Obtener por ID (admin o dueño)
export const getReservationById = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const reserva = await ReservationService.getReservationById(Number(req.params.id));
    if (!canAccess(reserva, user)) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    res.json(reserva);
  } catch {
    res.status(404).json({ error: 'Reserva no encontrada' });
  }
};

// Actualizar (admin o dueño)
export const updateReservation = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const reserva = await ReservationService.getReservationById(Number(req.params.id));
    if (!canAccess(reserva, user)) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    const updated = await ReservationService.updateReservation(Number(req.params.id), req.body);
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Error al actualizar la reserva' });
  }
};

// Eliminar (admin o dueño)
export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const reserva = await ReservationService.getReservationById(Number(req.params.id));
    if (!canAccess(reserva, user)) {
      return res.status(403).json({ message: 'Acceso denegado' });
    }
    await ReservationService.deleteReservation(Number(req.params.id));
    res.json({ message: 'Reserva eliminada' });
  } catch {
    res.status(500).json({ error: 'Error al eliminar la reserva' });
  }
};

// Listar reservas propias (o admin)
export const getReservationsByUser = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user;
    const uid = Number(req.params.usuario_id);
    // verifyUser middleware ya asegura uid === user.id
    const list = await ReservationService.getReservationsByUser(uid);
    res.json(list);
  } catch {
    res.status(500).json({ error: 'Error al obtener reservas por usuario' });
  }
};

// Filtrar propias por tipo (o admin)
export const getReservationsByUserAndType = async (req: Request, res: Response) => {
  const usuarioId = Number(req.params.usuario_id);
  const tipoParam = req.params.tipo_reserva;

  if (!ALLOWED_TYPES.includes(tipoParam as ReservaTipo)) {
    return res.status(400).json({ error: `tipo_reserva inválido. Use uno de: ${ALLOWED_TYPES.join(', ')}` });
  }
  const tipo = tipoParam as ReservaTipo;

  try {
    const list = await ReservationService.getReservationsByUserAndType(usuarioId, tipo);
    return res.json(list);
  } catch (err) {
    return res.status(500).json({ error: 'Error al obtener reservas por tipo' });
  }
};

// Historial propio (o admin)
export const getReservationHistoryByUser = async (req: Request, res: Response) => {
  try {
    const uid = Number(req.params.usuario_id);
    const history = await ReservationService.getReservationHistoryByUser(uid);
    res.json(history);
  } catch {
    res.status(500).json({ error: 'Error al obtener historial de reservas' });
  }
};
