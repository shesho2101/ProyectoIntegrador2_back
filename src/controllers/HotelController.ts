import { Request, Response } from 'express';
import HotelService from '../services/HotelService';

// Obtener todos los hoteles
export const getAllHotels = async (_req: Request, res: Response) => {
  try {
    const hotels = await HotelService.getAllHotels();
    res.json(hotels);
  } catch {
    res.status(500).json({ error: 'Error al obtener los hoteles' });
  }
};

// Obtener un hotel por ID
export const getHotelById = async (req: Request, res: Response) => {
  try {
    const hotel = await HotelService.getHotelById(req.params.id);
    res.json(hotel);
  } catch {
    res.status(404).json({ error: 'Hotel no encontrado' });
  }
};

// Crear nuevo hotel (Admin)
export const createHotel = async (req: Request, res: Response) => {
  try {
    const newHotel = await HotelService.createHotel(req.body);
    res.status(201).json(newHotel);
  } catch {
    res.status(500).json({ error: 'Error al crear el hotel' });
  }
};


// Actualizar hotel (Admin)
export const updateHotel = async (req: Request, res: Response) => {
  try {
    const updated = await HotelService.updateHotel(req.params.id, req.body);
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Error al actualizar el hotel' });
  }
};

// Eliminar hotel (Admin)
export const deleteHotel = async (req: Request, res: Response) => {
  try {
    await HotelService.deleteHotel(req.params.id);
    res.json({ message: 'Hotel eliminado' });
  } catch {
    res.status(500).json({ error: 'Error al eliminar el hotel' });
  }
};

// Filtrar hoteles por ciudad
export const getHotelsByCity = async (req: Request, res: Response) => {
  try {
    const hotels = await HotelService.getHotelsByCity(req.params.ciudad);
    res.json(hotels);
  } catch {
    res.status(500).json({ error: 'Error al filtrar hoteles por ciudad' });
  }
};

// Filtrar hoteles por rango de precio
export const getHotelsByPriceRange = async (req: Request, res: Response) => {
  try {
    const min = Number(req.params.min);
    const max = Number(req.params.max);
    const hotels = await HotelService.getHotelsByPriceRange(min, max);
    res.json(hotels);
  } catch {
    res.status(500).json({ error: 'Error al filtrar hoteles por precio' });
  }
};
