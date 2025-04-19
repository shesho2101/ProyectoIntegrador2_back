import { Router } from 'express';
import {
  agregarAlCarrito,
  obtenerCarritoPorUsuario,
  eliminarDelCarrito,
  actualizarCantidad
} from '../controllers/CartController';
import { verifyToken } from '../middlewares/AuthMiddleware';
import { verifyUser } from '../middlewares/CheckUserPermission';  // Middleware actualizado

const router = Router();

// Agregar un producto al carrito (solo el usuario logueado puede agregar productos)
router.post('/', verifyToken, agregarAlCarrito);

// Obtener el carrito de un usuario (solo puede ver su propio carrito)
router.get('/:usuario_id', verifyToken, verifyUser, obtenerCarritoPorUsuario);

// Eliminar un producto del carrito (solo puede eliminar de su propio carrito)
router.delete('/:usuario_id/:producto_id/:tipo_producto', verifyToken, verifyUser, eliminarDelCarrito);

// Actualizar la cantidad de un producto en el carrito (solo puede actualizar su propio carrito)
router.put('/:usuario_id/:producto_id', verifyToken, verifyUser, actualizarCantidad);

export default router;
