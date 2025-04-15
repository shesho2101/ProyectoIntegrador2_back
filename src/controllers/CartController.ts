// src/controllers/CartController.ts
import { Request, Response } from 'express';
import * as CartService from '../services/CartService';

// Agregar al carrito
export const agregarAlCarrito = async (req: Request, res: Response) => {
  const { usuario_id, producto_id, tipo_producto, cantidad } = req.body;

  try {
    const carrito = await CartService.addToCart({ usuario_id, producto_id, tipo_producto, cantidad });
    res.status(201).json(carrito);
  } catch (error) {
    res.status(500).json({ error: `Error al agregar al carrito` });
  }
};

// Obtener el carrito de un usuario
export const obtenerCarritoPorUsuario = async (req: Request, res: Response) => {
  const { usuario_id } = req.params;
  try {
    const carrito = await CartService.obtenerCarritoPorUsuario(usuario_id);
    res.json(carrito);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito: '});
  }
};

// Eliminar un producto del carrito
export const eliminarDelCarrito = async (req: Request, res: Response) => {
  const { usuario_id, producto_id, tipo_producto } = req.params;

  try {
    const cart = await CartService.eliminarDelCarrito(usuario_id, producto_id, tipo_producto);
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto del carrito: '});
  }
};

export const actualizarCantidad = async (req: Request, res: Response) => {
  const { usuario_id, producto_id } = req.params;
  const { cantidad } = req.body;

  try {
    if (cantidad <= 0) {
      return res.status(400).json({ error: 'La cantidad debe ser mayor a 0' });
    }

    const updatedCart = await CartService.actualizarCantidad(usuario_id, producto_id, cantidad);

    return res.json(updatedCart);
  } catch (error) {
    return res.status(500).json({ error: 'Error al actualizar la cantidad: '});
  }
};


