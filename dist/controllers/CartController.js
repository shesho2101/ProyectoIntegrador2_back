"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarCantidad = exports.eliminarDelCarrito = exports.obtenerCarritoPorUsuario = exports.agregarAlCarrito = void 0;
const CartService = __importStar(require("../services/CartService"));
// Agregar al carrito
const agregarAlCarrito = async (req, res) => {
    const { usuario_id, producto_id, tipo_producto, cantidad } = req.body;
    try {
        const carrito = await CartService.addToCart({ usuario_id, producto_id, tipo_producto, cantidad });
        res.status(201).json(carrito);
    }
    catch (error) {
        res.status(500).json({ error: `Error al agregar al carrito` });
    }
};
exports.agregarAlCarrito = agregarAlCarrito;
// Obtener el carrito de un usuario
const obtenerCarritoPorUsuario = async (req, res) => {
    try {
        const userId = req.user?.id; // Obtén el id del usuario del token
        const paramId = parseInt(req.params.usuario_id); // El id del usuario de la URL
        // Verificar que el usuario solo pueda acceder a su propio carrito
        if (userId !== paramId) {
            return res.status(403).json({ message: 'Acceso denegado: Solo puedes acceder a tu propio carrito' });
        }
        const cart = await CartService.obtenerCarritoPorUsuario(paramId); // Llamar al servicio
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el carrito' });
    }
};
exports.obtenerCarritoPorUsuario = obtenerCarritoPorUsuario;
// Eliminar un producto del carrito
const eliminarDelCarrito = async (req, res) => {
    const { usuario_id, producto_id, tipo_producto } = req.params;
    try {
        const cart = await CartService.eliminarDelCarrito(usuario_id, producto_id, tipo_producto);
        res.json(cart);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto del carrito: ' });
    }
};
exports.eliminarDelCarrito = eliminarDelCarrito;
const actualizarCantidad = async (req, res) => {
    const { usuario_id, producto_id } = req.params;
    const { cantidad } = req.body;
    try {
        if (cantidad <= 0) {
            return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
        }
        const updatedCart = await CartService.actualizarCantidad(usuario_id, producto_id, cantidad);
        return res.json(updatedCart);
    }
    catch (error) {
        return res.status(500).json({ error: 'Error al actualizar la cantidad: ' });
    }
};
exports.actualizarCantidad = actualizarCantidad;
