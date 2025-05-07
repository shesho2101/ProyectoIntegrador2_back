"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const CartController_1 = require("../controllers/CartController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const CheckUserPermission_1 = require("../middlewares/CheckUserPermission"); // Middleware actualizado
const router = (0, express_1.Router)();
// Agregar un producto al carrito (solo el usuario logueado puede agregar productos)
router.post('/', AuthMiddleware_1.verifyToken, CartController_1.agregarAlCarrito);
// Obtener el carrito de un usuario (solo puede ver su propio carrito)
router.get('/:usuario_id', AuthMiddleware_1.verifyToken, CheckUserPermission_1.verifyUser, CartController_1.obtenerCarritoPorUsuario);
// Eliminar un producto del carrito (solo puede eliminar de su propio carrito)
router.delete('/:usuario_id/:producto_id/:tipo_producto', AuthMiddleware_1.verifyToken, CheckUserPermission_1.verifyUser, CartController_1.eliminarDelCarrito);
// Actualizar la cantidad de un producto en el carrito (solo puede actualizar su propio carrito)
router.put('/:usuario_id/:producto_id', AuthMiddleware_1.verifyToken, CheckUserPermission_1.verifyUser, CartController_1.actualizarCantidad);
exports.default = router;
