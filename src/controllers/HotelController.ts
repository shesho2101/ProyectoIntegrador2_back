import { Request, Response } from 'express';
import HotelService from '../services/HotelService';

// Obtener todos los hoteles
export const getAllHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await HotelService.getAllHotels();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener los hoteles: ${error.message || error}` });
  }
};

// Obtener un hotel por ID
export const getHotelById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const hotel = await HotelService.getHotelById(id);
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener el hotel: ${error.message || error}` });
  }
};

// Crear un nuevo hotel
export const createHotel = async (req: Request, res: Response) => {
  const hotelData = req.body;
  try {
    const newHotel = await HotelService.createHotel(hotelData);
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ error: `Error al crear el hotel: ${error.message || error}` });
  }
};

// Actualizar un hotel por ID
export const updateHotel = async (req: Request, res: Response) => {
  const { id } = req.params;
  const hotelData = req.body;
  try {
    const updatedHotel = await HotelService.updateHotel(id, hotelData);
    res.json(updatedHotel);
  } catch (error) {
    res.status(500).json({ error: `Error al actualizar el hotel: ${error.message || error}` });
  }
};

// Eliminar un hotel por ID
export const deleteHotel = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await HotelService.deleteHotel(id);
    res.json({ message: 'Hotel eliminado' });
  } catch (error) {
    res.status(500).json({ error: `Error al eliminar el hotel: ${error.message || error}` });
  }
};

// Filtrar hoteles por ciudad
export const getHotelsByCity = async (req: Request, res: Response) => {
  const { ciudad } = req.params;
  try {
    const hotels = await HotelService.getHotelsByCity(ciudad);
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener hoteles por ciudad: ${error.message || error}` });
  }
};

// Filtrar hoteles por precio
export const getHotelsByPrice = async (req: Request, res: Response) => {
  const { minPrice, maxPrice } = req.query;
  try {
    const hotels = await HotelService.getHotelsByPrice(Number(minPrice), Number(maxPrice));
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener hoteles por precio: ${error.message || error}` });
  }
};

// Filtrar hoteles por rating
export const getHotelsByRating = async (req: Request, res: Response) => {
  const { rating } = req.params;
  try {
    const hotels = await HotelService.getHotelsByRating(Number(rating));
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener hoteles por rating: ${error.message || error}` });
  }
};

// Filtrar hoteles por disponibilidad
export const getHotelsByAvailability = async (req: Request, res: Response) => {
  const { disponibilidad } = req.params;
  try {
    const hotels = await HotelService.getHotelsByAvailability(disponibilidad === 'true');
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener hoteles por disponibilidad: ${error.message || error}` });
  }
};
