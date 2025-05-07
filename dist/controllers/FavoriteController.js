"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavorite = exports.addFavorite = exports.getFavoritesByUser = void 0;
const FavoriteService_1 = __importDefault(require("../services/FavoriteService"));
// Obtener todos los favoritos de un usuario
const getFavoritesByUser = async (req, res) => {
    try {
        const userId = req.user?.id; // Obtén el id del usuario del token
        const paramId = parseInt(req.params.usuario_id); // El id del usuario de la URL
        if (userId !== paramId) {
            return res.status(403).json({ message: 'Acceso denegado: Solo puedes acceder a tus propios datos' });
        }
        const favorites = await FavoriteService_1.default.getFavoritesByUser(paramId); // Llamar al servicio
        res.json(favorites);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los favoritos' });
    }
};
exports.getFavoritesByUser = getFavoritesByUser;
// Agregar un nuevo favorito
const addFavorite = async (req, res) => {
    const { usuario_id, tipo_favorito, referencia_mongo_id } = req.body;
    try {
        if (!usuario_id || !tipo_favorito || !referencia_mongo_id) {
            return res.status(400).json({ error: 'Faltan datos requeridos para agregar el favorito' });
        }
        const newFavorite = await FavoriteService_1.default.addFavorite({
            usuario_id,
            tipo_favorito,
            referencia_mongo_id,
        });
        res.status(201).json(newFavorite);
    }
    catch (error) {
        res.status(500).json({ error: `Error al agregar el favorito` });
    }
};
exports.addFavorite = addFavorite;
// Eliminar un favorito
const removeFavorite = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await FavoriteService_1.default.removeFavorite(Number(id));
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: `Error al eliminar el favorito` });
    }
};
exports.removeFavorite = removeFavorite;
