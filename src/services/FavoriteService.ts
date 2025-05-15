// src/services/FavoriteService.ts
import Bus from '../models/BusModel';
import Favorite from '../models/FavoriteModel';
import Hotel from '../models/HotelModel';
import Flight from '../models/FlightModel';


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

  // Nueva función para buscar favorito por referencia_mongo_id y traer datos completos
  public static async getFavoriteDetailByReferencia(referenciaId: string) {
    const fav = await Favorite.findOne({ where: { referencia_mongo_id: referenciaId } });
    if (!fav) throw new Error('Favorito no encontrado');

    let detalles = null;
    if (fav.tipo_favorito === 'hotel') {
      detalles = await Hotel.findById(referenciaId).lean();
    } else if (fav.tipo_favorito === 'vuelo') {
      detalles = await Flight.findById(referenciaId).lean();
    } else if (fav.tipo_favorito === 'bus') {
      detalles = await Bus.findById(referenciaId).lean();
    }

    return { ...fav.toJSON(), detalles };
  }
}

export default FavoriteService;
