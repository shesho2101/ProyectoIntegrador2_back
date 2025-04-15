import { Request, Response } from 'express';
import HotelService from '../services/HotelService';

// Obtener todos los hoteles
export const getAllHotels = async (req: Request, res: Response) => {
  try {
    const hotels = await HotelService.getAllHotels();
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener los hoteles`});
  }
};

// Obtener un hotel por ID
export const getHotelById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Buscar el hotel por ID
    const hotel = await HotelService.getHotelById(id);

    // Verificar que el hotel existe
    if (!hotel) {
      return res.status(404).json({ error: 'Hotel no encontrado' });
    }

    // Si el hotel existe, cargar las opiniones
    const hotelWithOpinions = await hotel.populate('opiniones');  // Cargar las opiniones
    res.json(hotelWithOpinions);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener el hotel` });
  }
};


// Crear un nuevo hotel
export const createHotel = async (req: Request, res: Response) => {
  const hotelData = req.body;
  try {
    const newHotel = await HotelService.createHotel(hotelData);
    res.status(201).json(newHotel);
  } catch (error) {
    res.status(500).json({ error: `Error al crear el hotel` });
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
    res.status(500).json({ error: `Error al actualizar el hotel` });
  }
};

// Eliminar un hotel por ID
export const deleteHotel = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await HotelService.deleteHotel(id);
    res.json({ message: 'Hotel eliminado' });
  } catch (error) {
    res.status(500).json({ error: `Error al eliminar el hotel` });
  }
};

// Filtrar hoteles por ciudad
export const getHotelsByCity = async (req: Request, res: Response) => {
  const { ciudad } = req.params;
  try {
    const hotels = await HotelService.getHotelsByCity(ciudad);
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener hoteles por ciudad` });
  }
};

// Filtrar hoteles por precio
export const getHotelsByPrice = async (req: Request, res: Response) => {
  const { minPrice, maxPrice } = req.query;
  try {
    const hotels = await HotelService.getHotelsByPrice(Number(minPrice), Number(maxPrice));
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener hoteles por precio` });
  }
};

