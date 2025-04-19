// src/routes/FavoriteRoutes.ts
import { Router } from 'express';
import {
  getFavoritesByUser,
  addFavorite,
  removeFavorite,
} from '../controllers/FavoriteController';
import { verifyToken } from '../middlewares/AuthMiddleware';
import { verifyUser } from '../middlewares/CheckUserPermission';

const router = Router();

// Obtener todos los favoritos de un usuario
router.get('/user/:usuario_id', verifyToken, verifyUser, getFavoritesByUser);

// Agregar un nuevo favorito
router.post('/', verifyToken, addFavorite);

// Eliminar un favorito por ID
router.delete('/:id', verifyToken, removeFavorite);

export default router;
