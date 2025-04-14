// src/services/FavoriteService.ts
import Favorite from '../models/FavoriteModel';

class FavoriteService {
  // Obtener todos los favoritos de un usuario
  public static async getFavoritesByUser(userId: number) {
    try {
      const favorites = await Favorite.findAll({
        where: { usuario_id: userId },
      });
      return favorites;
    } catch (error) {
      throw new Error('Error al obtener los favoritos: ');
    }
  }

  // Agregar un nuevo favorito
  public static async addFavorite(favoriteData: any) {
    try {
      const newFavorite = await Favorite.create(favoriteData);
      return newFavorite;
    } catch (error) {
      throw new Error('Error al agregar el favorito: ');
    }
  }

  // Eliminar un favorito por ID
  public static async removeFavorite(favoriteId: number) {
    try {
      const favorite = await Favorite.findByPk(favoriteId);
      if (!favorite) {
        throw new Error('Favorito no encontrado');
      }
      await favorite.destroy();
      return { message: 'Favorito eliminado' };
    } catch (error) {
      throw new Error('Error al eliminar el favorito: ');
    }
  }
}

export default FavoriteService;
