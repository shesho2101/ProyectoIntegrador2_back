import { Router } from 'express';
import { crearReserva } from '../controllers/ReservationController';
import { verifyToken } from '../middlewares/AuthMiddleware';

const router = Router();
router.post('/', verifyToken, crearReserva);
export default router;
