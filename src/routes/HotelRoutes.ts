import { Router } from 'express';
import {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelsByCity,
  getHotelsByPrice
} from '../controllers/HotelController';

const router = Router();

// Obtener todos los hoteles
router.get('/', getAllHotels);

// Obtener un hotel por ID
router.get('/:id', getHotelById);

// Crear un nuevo hotel
router.post('/', createHotel);

// Actualizar un hotel por ID
router.put('/:id', updateHotel);

// Eliminar un hotel por ID
router.delete('/:id', deleteHotel);

// Filtrar hoteles por ciudad
router.get('/city', getHotelsByCity);

// Filtrar hoteles por precio
router.get('/price', getHotelsByPrice);

export default router;
