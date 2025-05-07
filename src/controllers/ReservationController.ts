import { Request, Response } from 'express';
import Reservation from '../models/ReservationModel';
import Hotel from '../models/HotelModel';

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { hotelId, fecha_inicio, fecha_fin } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    // Verificar que el hotel exista
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      return res.status(404).json({ message: 'Hotel no encontrado' });
    }

    // Verificar solapamiento de fechas
    const reservasExistentes = await Reservation.find({
      hotel: hotelId,
      $or: [
        {
          fecha_inicio: { $lte: fecha_fin },
          fecha_fin: { $gte: fecha_inicio },
        },
      ],
    });

    if (reservasExistentes.length > 0) {
      return res.status(409).json({ message: 'Fechas no disponibles para este hotel' });
    }

    const nuevaReserva = await Reservation.create({
      usuario: userId,
      hotel: hotelId,
      fecha_inicio,
      fecha_fin,
    });

    res.status(201).json(nuevaReserva);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la reserva', error });
  }
};

export const getReservationsByUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: 'No autorizado' });
    }

    const reservas = await Reservation.find({ usuario: userId }).populate('hotel');
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reservas del usuario', error });
  }
};

export const getAllReservations = async (req: Request, res: Response) => {
  try {
    const reservas = await Reservation.find().populate('usuario hotel');
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener todas las reservas', error });
  }
};

export const deleteReservation = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { id } = req.params;

    const reserva = await Reservation.findById(id);

    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    if (String(reserva.usuario) !== userId) {
      return res.status(403).json({ message: 'No tienes permiso para eliminar esta reserva' });
    }

    await Reservation.findByIdAndDelete(id);
    res.status(200).json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la reserva', error });
  }
};
