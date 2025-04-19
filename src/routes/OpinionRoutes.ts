import { Router } from 'express';
import { createOpinion, getAllOpinions, deleteOpinion, getOpinionById } from '../controllers/OpinionController';
import { verifyToken } from '../middlewares/AuthMiddleware';
import { verifyAdmin } from '../middlewares/VerifyAdminMiddleware';

const router = Router();

// Crear opinión (Solo usuarios logueados)
router.post('/', verifyToken, createOpinion);

// Obtener todas las opiniones (Todos los usuarios)
router.get('/', getAllOpinions);

// Eliminar una opinión por ID (Solo Admin)
router.delete('/:id', verifyToken, verifyAdmin, deleteOpinion);

// Obtener una opinión por ID
router.get('/:id', getOpinionById);

export default router;
