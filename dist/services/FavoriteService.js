"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/FavoriteService.ts
const FavoriteModel_1 = __importDefault(require("../models/FavoriteModel"));
class FavoriteService {
    // Obtener todos los favoritos de un usuario
    static async getFavoritesByUser(userId) {
        try {
            const favorites = await FavoriteModel_1.default.findAll({
                where: { usuario_id: userId },
            });
            return favorites;
        }
        catch (error) {
            throw new Error('Error al obtener los favoritos: ');
        }
    }
    // Agregar un nuevo favorito
    static async addFavorite(favoriteData) {
        try {
            const newFavorite = await FavoriteModel_1.default.create(favoriteData);
            return newFavorite;
        }
        catch (error) {
            throw new Error('Error al agregar el favorito: ');
        }
    }
    // Eliminar un favorito por ID
    static async removeFavorite(favoriteId) {
        try {
            const favorite = await FavoriteModel_1.default.findByPk(favoriteId);
            if (!favorite) {
                throw new Error('Favorito no encontrado');
            }
            await favorite.destroy();
            return { message: 'Favorito eliminado' };
        }
        catch (error) {
            throw new Error('Error al eliminar el favorito: ');
        }
    }
}
exports.default = FavoriteService;
