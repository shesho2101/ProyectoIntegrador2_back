import { Router } from 'express';
import {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelsByCity,
  getHotelsByPrice,
  searchHotelsByName,
  getTopRatedHotels
} from '../controllers/HotelController';

const router = Router();

// Obtener todos los hoteles
router.get('/', getHotels);

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

// Buscar hoteles por nombre
router.get('/search', searchHotelsByName);

// Obtener hoteles con mejores valoraciones
router.get('/top-rated', getTopRatedHotels);

export default router;
