import { Request, Response } from 'express';
import FavoriteService from '../services/FavoriteService';
import { AuthRequest } from '../middlewares/AuthMiddleware';

// Obtener todos los favoritos de un usuario
export const getFavoritesByUser = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;  // Obtén el id del usuario del token
    const paramId = parseInt(req.params.usuario_id);  // El id del usuario de la URL

    if (userId !== paramId) {
      return res.status(403).json({ message: 'Acceso denegado: Solo puedes acceder a tus propios datos' });
    }

    const favorites = await FavoriteService.getFavoritesByUser(paramId);  // Llamar al servicio
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los favoritos' });
  }
};

// Agregar un nuevo favorito
export const addFavorite = async (req: Request, res: Response) => {
  const { usuario_id, tipo_favorito, referencia_mongo_id } = req.body;
  try {
    if (!usuario_id || !tipo_favorito || !referencia_mongo_id) {
      return res.status(400).json({ error: 'Faltan datos requeridos para agregar el favorito' });
    }

    const newFavorite = await FavoriteService.addFavorite({
      usuario_id,
      tipo_favorito,
      referencia_mongo_id,
    });
    res.status(201).json(newFavorite);
  } catch (error) {
    res.status(500).json({ error: `Error al agregar el favorito` });
  }
};

// Eliminar un favorito
export const removeFavorite = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await FavoriteService.removeFavorite(Number(id));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: `Error al eliminar el favorito` });
  }
};
