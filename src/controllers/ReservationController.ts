import { Request, Response } from 'express';
import ReservationService from '../services/ReservationService';

// Crear una nueva reserva
export const createReservation = async (req: Request, res: Response) => {
  const { usuario_id, tipo_reserva, referencia_mongo_id, fecha_reserva, estado = 'pendiente' } = req.body;

  try {
    if (!fecha_reserva) {
      return res.status(400).json({ error: 'La fecha de reserva es obligatoria' });
    }

    const newReservation = await ReservationService.createReservation({
      usuario_id,
      tipo_reserva,
      referencia_mongo_id,
      fecha_reserva,
      estado,
    });

    res.status(201).json(newReservation);
  } catch (error) {
    res.status(500).json({ error: `Error al crear la reserva` });
  }
};

// Obtener todas las reservas
export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await ReservationService.getAllReservations();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener todas las reservas` });
  }
};

// Obtener reserva por ID
export const getReservationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const reservation = await ReservationService.getReservationById(id);
    if (!reservation) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener la reserva` });
  }
};

// Actualizar una reserva por ID
export const updateReservation = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { estado, fecha_reserva } = req.body;

  try {
    const updatedReservation = await ReservationService.updateReservation(id, { estado, fecha_reserva });
    if (!updatedReservation) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.json(updatedReservation);
  } catch (error) {
    res.status(500).json({ error: `Error al actualizar la reserva` });
  }
};

// Eliminar una reserva por ID
export const deleteReservation = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const deletedReservation = await ReservationService.deleteReservation(id);
    if (!deletedReservation) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json({ message: 'Reserva eliminada' });
  } catch (error) {
    res.status(500).json({ error: `Error al eliminar la reserva` });
  }
};

// Filtrar reservas por estado
export const getReservationsByStatus = async (req: Request, res: Response) => {
  const { estado } = req.params;

  try {
    const reservations = await ReservationService.getReservationsByStatus(estado);
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener las reservas con estado ${estado}` });
  }
};

// Filtrar reservas por usuario
export const getReservationsByUser = async (req: Request, res: Response) => {
  const { usuario_id } = req.params;

  try {
    const reservations = await ReservationService.getReservationsByUser(usuario_id);
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener las reservas del usuario ${usuario_id}` });
  }
};

// Filtrar reservas por tipo
export const getReservationsByType = async (req: Request, res: Response) => {
  const { tipo_reserva } = req.params;

  try {
    const reservations = await ReservationService.getReservationsByType(tipo_reserva);
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener las reservas del tipo ${tipo_reserva}` });
  }
};

// Filtrar reservas por fecha de reserva
export const getReservationsByDate = async (req: Request, res: Response) => {
  const { fecha_reserva } = req.params;

  try {
    const reservations = await ReservationService.getReservationsByDate(fecha_reserva);
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener las reservas por fecha de reserva ${fecha_reserva}` });
  }
};

// Filtrar reservas por usuario y tipo
export const getReservationsByUserAndType = async (req: Request, res: Response) => {
  const { usuario_id, tipo_reserva } = req.params;

  try {
    const reservations = await ReservationService.getReservationsByUserAndType(usuario_id, tipo_reserva);
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener las reservas del usuario ${usuario_id} y tipo ${tipo_reserva}` });
  }
};
