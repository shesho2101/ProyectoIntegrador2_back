"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.actualizarCantidad = exports.eliminarDelCarrito = exports.obtenerCarritoPorUsuario = exports.addToCart = void 0;
const CartModel_1 = __importDefault(require("../models/CartModel"));
const HotelModel_1 = __importDefault(require("../models/HotelModel"));
const BusModel_1 = __importDefault(require("../models/BusModel"));
const FlightModel_1 = __importDefault(require("../models/FlightModel"));
const addToCart = async (cartData) => {
    const { usuario_id, producto_id, tipo_producto, cantidad } = cartData;
    try {
        let cart = await CartModel_1.default.findOne({ usuario_id });
        if (!cart) {
            cart = new CartModel_1.default({ usuario_id, productos: [], total: 0 });
        }
        let product;
        if (tipo_producto === 'hotel') {
            product = await HotelModel_1.default.findById(producto_id);
        }
        else if (tipo_producto === 'bus') {
            product = await BusModel_1.default.findById(producto_id);
        }
        else if (tipo_producto === 'vuelo') {
            product = await FlightModel_1.default.findById(producto_id);
        }
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        const precioTotal = product.precio * cantidad;
        cart.productos.push({ producto_id, tipo_producto, cantidad, precio_total: precioTotal });
        cart.total += precioTotal;
        await cart.save();
        return cart;
    }
    catch (error) {
        throw new Error(`Error al agregar producto al carrito`);
    }
};
exports.addToCart = addToCart;
const obtenerCarritoPorUsuario = async (userId) => {
    try {
        const carrito = await CartModel_1.default.findOne({ usuario_id: userId });
        if (!carrito)
            throw new Error('Carrito no encontrado');
        return carrito;
    }
    catch (error) {
        throw new Error('Error al obtener el carrito');
    }
};
exports.obtenerCarritoPorUsuario = obtenerCarritoPorUsuario;
const eliminarDelCarrito = async (usuario_id, producto_id, tipo_producto) => {
    try {
        const cart = await CartModel_1.default.findOne({ usuario_id });
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        const productIndex = cart.productos.findIndex((product) => product.producto_id === producto_id && product.tipo_producto === tipo_producto);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado en el carrito');
        }
        const productToRemove = cart.productos[productIndex];
        cart.total -= productToRemove.precio_total;
        cart.productos.splice(productIndex, 1);
        await cart.save();
        return cart;
    }
    catch (error) {
        throw new Error('Error al eliminar el producto del carrito: ');
    }
};
exports.eliminarDelCarrito = eliminarDelCarrito;
const actualizarCantidad = async (usuario_id, producto_id, cantidad) => {
    try {
        const cart = await CartModel_1.default.findOne({ usuario_id });
        if (!cart) {
            throw new Error('Carrito no encontrado');
        }
        const productIndex = cart.productos.findIndex((product) => product.producto_id === producto_id);
        if (productIndex === -1) {
            throw new Error('Producto no encontrado en el carrito');
        }
        let product;
        const producto = cart.productos[productIndex];
        if (producto.tipo_producto === 'hotel') {
            product = await HotelModel_1.default.findById(producto.producto_id);
        }
        else if (producto.tipo_producto === 'bus') {
            product = await BusModel_1.default.findById(producto.producto_id);
        }
        else if (producto.tipo_producto === 'vuelo') {
            product = await FlightModel_1.default.findById(producto.producto_id);
        }
        if (!product) {
            throw new Error('Producto no encontrado');
        }
        const newPrice = product.precio * cantidad;
        cart.productos[productIndex].cantidad = cantidad;
        cart.productos[productIndex].precio_total = newPrice;
        cart.total = cart.productos.reduce((total, product) => total + product.precio_total, 0);
        await cart.save();
        return cart;
    }
    catch (error) {
        throw new Error('Error al actualizar la cantidad: ');
    }
};
exports.actualizarCantidad = actualizarCantidad;
