import { Router } from 'express';
import {
    createOpinion,
    getAllOpinions,
    deleteOpinion,
    getOpinionById
} from '../controllers/OpinionController';

const router = Router();

// Crear opinión
router.post('/', createOpinion);

// Obtener todas las opiniones
router.get('/', getAllOpinions);

// Eliminar una opinión por ID (solo admin)
router.delete('/:id', deleteOpinion);

// Obtener por id
router.get('/:id', getOpinionById);

export default router;
