import { Router } from 'express';
import { getAllHotels, getHotelById, createHotel, updateHotel, deleteHotel, getHotelsByCity, getHotelsByPrice } from '../controllers/HotelController';
import { verifyToken } from '../middlewares/AuthMiddleware';
import { verifyAdmin } from '../middlewares/VerifyAdminMiddleware';

const router = Router();

// Obtener todos los hoteles
router.get('/', getAllHotels);

// Obtener un hotel por ID
router.get('/:id', getHotelById);

// Crear un nuevo hotel (Solo Admin)
router.post('/', verifyToken, verifyAdmin, createHotel);

// Actualizar un hotel por ID (Solo Admin)
router.put('/:id', verifyToken, verifyAdmin, updateHotel);

// Eliminar un hotel por ID (Solo Admin)
router.delete('/:id', verifyToken, verifyAdmin, deleteHotel);

// Filtrar hoteles por ciudad
router.get('/city', getHotelsByCity);

// Filtrar hoteles por precio
router.get('/price', getHotelsByPrice);

export default router;
