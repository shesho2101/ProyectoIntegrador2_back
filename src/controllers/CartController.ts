// src/controllers/CartController.ts
import { Request, Response } from 'express';
import * as CartService from '../services/CartService';
import { AuthRequest } from '../middlewares/AuthMiddleware';

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
export const obtenerCarritoPorUsuario = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;  // Obtén el id del usuario del token
    const paramId = parseInt(req.params.usuario_id);  // El id del usuario de la URL

    // Verificar que el usuario solo pueda acceder a su propio carrito
    if (userId !== paramId) {
      return res.status(403).json({ message: 'Acceso denegado: Solo puedes acceder a tu propio carrito' });
    }

    const cart = await CartService.obtenerCarritoPorUsuario(paramId);  // Llamar al servicio
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el carrito' });
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


