import { Request, Response } from "express";
import Reservation from "../models/ReservationModel";
import { AuthRequest } from "../middlewares/AuthMiddleware";

export const createReservation = async (req: AuthRequest, res: Response) => {
  const { hotel_id, fecha_inicio, fecha_fin } = req.body;

  if (!req.user) return res.status(401).json({ message: "No autorizado" });

  const overlappingReservation = await Reservation.findOne({
    hotel_id,
    $or: [
      {
        fecha_inicio: { $lte: fecha_fin },
        fecha_fin: { $gte: fecha_inicio },
      },
    ],
  });

  if (overlappingReservation) {
    return res.status(400).json({ message: "El hotel ya está reservado en esas fechas" });
  }

  const nuevaReserva = new Reservation({
    usuario_id: req.user.id,
    hotel_id,
    fecha_inicio,
    fecha_fin,
  });

  await nuevaReserva.save();
  res.status(201).json(nuevaReserva);
};

export const getUserReservations = async (req: AuthRequest, res: Response) => {
  if (!req.user) return res.status(401).json({ message: "No autorizado" });

  try {
    const reservas = await Reservation.find({ usuario_id: req.user.id })
      .populate("hotel_id");  // Populate para traer la información del hotel
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reservas" });
  }
};

export const getAllReservations = async (req: AuthRequest, res: Response) => {
  if (!req.user || req.user.rol !== "admin") {
    return res.status(403).json({ message: "Acceso restringido" });
  }

  try {
    const reservas = await Reservation.find()
      .populate("hotel_id")
      .populate("usuario_id"); // Asegúrate de que también puedes obtener la información del usuario
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener todas las reservas" });
  }
};
