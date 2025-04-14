// src/routes/FavoriteRoutes.ts
import { Router } from 'express';
import {
  getFavoritesByUser,
  addFavorite,
  removeFavorite,
} from '../controllers/FavoriteController';

const router = Router();

// Obtener todos los favoritos de un usuario
router.get('/user/:userId', getFavoritesByUser);

// Agregar un nuevo favorito
router.post('/', addFavorite);

// Eliminar un favorito por ID
router.delete('/:id', removeFavorite);

export default router;
