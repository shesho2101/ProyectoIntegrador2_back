// src/routes/CartRoutes.ts
import { Router } from 'express';
import {
  agregarAlCarrito,
  obtenerCarritoPorUsuario,
  eliminarDelCarrito,
  actualizarCantidad,
} from '../controllers/CartController';
import { verifyToken } from '../middlewares/AuthMiddleware';  

const router = Router();

// Agregar un producto al carrito
router.post('/', verifyToken, agregarAlCarrito);

// Obtener el carrito de un usuario
router.get('/:usuario_id', verifyToken, obtenerCarritoPorUsuario);

// Eliminar un producto del carrito
router.delete('/:usuario_id/:producto_id/:tipo_producto', verifyToken, eliminarDelCarrito);

// Actualizar la cantidad de un producto en el carrito
router.put('/:usuario_id/:producto_id', verifyToken, actualizarCantidad);

export default router;
