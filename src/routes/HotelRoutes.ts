import { Router } from 'express';
import {
  getAllHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotel,
  getHotelsByCity,
  getHotelsByPriceRange
} from '../controllers/HotelController';
import { verifyToken } from '../middlewares/AuthMiddleware';
import { verifyAdmin } from '../middlewares/VerifyAdminMiddleware';

const router = Router();

// Público: obtener todos los hoteles
router.get('/', getAllHotels);

// Público: obtener un hotel por ID
router.get('/:id', getHotelById);

// Admin: crear, actualizar y borrar hoteles
router.post('/', verifyToken, verifyAdmin, createHotel);
router.put('/:id', verifyToken, verifyAdmin, updateHotel);
router.delete('/:id', verifyToken, verifyAdmin, deleteHotel);

// Público: filtrar hoteles por ciudad
router.get('/city/:ciudad', getHotelsByCity);

// Público: filtrar hoteles por rango de precio
router.get('/price/:min/:max', getHotelsByPriceRange);

export default router;
