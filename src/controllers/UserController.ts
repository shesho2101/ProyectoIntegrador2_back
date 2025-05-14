import { Request, Response } from 'express';
import User from '../models/UserModel';
import Favorite from '../models/FavoriteModel'; // Asumiendo que tienes un modelo de favoritos
import Reservation from '../models/ReservationModel'; // Asumiendo que tienes un modelo de reservas

// Obtener los datos del usuario
export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    res.json({
      id: user.id,
      nombre: user.nombre,
      email: user.email,
      fecha_registro: user.fecha_registro,
      rol: user.rol,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos del usuario' });
  }
};

// Actualizar los datos del usuario
export const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    const { nombre, email } = req.body;
    user.nombre = nombre || user.nombre;
    user.email = email || user.email;

    await user.save();
    res.json({ message: 'Datos actualizados correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar los datos' });
  }
};

// Obtener los favoritos del usuario
export const getFavorites = async (req: Request, res: Response) => {
  try {
    const favorites = await Favorite.findAll({ where: { userId: req.params.id } });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener favoritos' });
  }
};

// Obtener las reservas del usuario
export const getReservations = async (req: Request, res: Response) => {
  try {
    const reservations = await Reservation.find({ usuario_id: req.params.id }).populate("hotel_id");  // Aquí estamos usando find() para encontrar las reservas
    res.json(reservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las reservas' });
  }
};