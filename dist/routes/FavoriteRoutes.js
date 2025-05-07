"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/FavoriteRoutes.ts
const express_1 = require("express");
const FavoriteController_1 = require("../controllers/FavoriteController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const CheckUserPermission_1 = require("../middlewares/CheckUserPermission");
const router = (0, express_1.Router)();
// Obtener todos los favoritos de un usuario
router.get('/user/:usuario_id', AuthMiddleware_1.verifyToken, CheckUserPermission_1.verifyUser, FavoriteController_1.getFavoritesByUser);
// Agregar un nuevo favorito
router.post('/', AuthMiddleware_1.verifyToken, FavoriteController_1.addFavorite);
// Eliminar un favorito por ID
router.delete('/:id', AuthMiddleware_1.verifyToken, FavoriteController_1.removeFavorite);
exports.default = router;
