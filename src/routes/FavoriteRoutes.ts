import { Router } from 'express';
import {
  getFavoritesByUser,
  addFavorite,
  removeFavorite,
  getFavoriteDetail,
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

router.get('/detalle/:referencia_mongo_id', verifyToken, getFavoriteDetail);  // <-- ruta nueva


export default router;
