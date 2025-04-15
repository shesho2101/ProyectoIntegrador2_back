import Cart from '../models/CartModel';
import Hotel from '../models/HotelModel';
import Bus from '../models/BusModel';
import Flight from '../models/FlightModel';

export const addToCart = async (cartData: any) => {
  const { usuario_id, producto_id, tipo_producto, cantidad } = cartData;

  try {
    let cart = await Cart.findOne({ usuario_id });

    if (!cart) {
      cart = new Cart({ usuario_id, productos: [], total: 0 });
    }

    let product;
    if (tipo_producto === 'hotel') {
      product = await Hotel.findById(producto_id);
    } else if (tipo_producto === 'bus') {
      product = await Bus.findById(producto_id);
    } else if (tipo_producto === 'vuelo') {
      product = await Flight.findById(producto_id);
    }

    if (!product) {
      throw new Error('Producto no encontrado');
    }

    const precioTotal = product.precio * cantidad;

    cart.productos.push({ producto_id, tipo_producto, cantidad, precio_total: precioTotal });

    cart.total += precioTotal;

    await cart.save();

    return cart;
  } catch (error) {
    throw new Error(`Error al agregar producto al carrito`);
  }
};

export const obtenerCarritoPorUsuario = async (usuario_id: string) => {
  try {
    const carrito = await Cart.findOne({ usuario_id });
    if (!carrito) throw new Error('Carrito no encontrado');
    return carrito;
  } catch (error) {
    throw new Error('Error al obtener el carrito: ');
  }
};

export const eliminarDelCarrito = async (usuario_id: string, producto_id: string, tipo_producto: string) => {
  try {
    const cart = await Cart.findOne({ usuario_id });

    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const productIndex = cart.productos.findIndex(
      (product) => product.producto_id === producto_id && product.tipo_producto === tipo_producto
    );

    if (productIndex === -1) {
      throw new Error('Producto no encontrado en el carrito');
    }

    const productToRemove = cart.productos[productIndex];
    cart.total -= productToRemove.precio_total;

    cart.productos.splice(productIndex, 1);

    await cart.save();

    return cart;
  } catch (error) {
    throw new Error('Error al eliminar el producto del carrito: ');
  }
};
export const actualizarCantidad = async (usuario_id: string, producto_id: string, cantidad: number) => {
  try {
    const cart = await Cart.findOne({ usuario_id });

    if (!cart) {
      throw new Error('Carrito no encontrado');
    }

    const productIndex = cart.productos.findIndex(
      (product) => product.producto_id === producto_id
    );

    if (productIndex === -1) {
      throw new Error('Producto no encontrado en el carrito');
    }

    let product;
    const producto = cart.productos[productIndex];

    if (producto.tipo_producto === 'hotel') {
      product = await Hotel.findById(producto.producto_id);
    } else if (producto.tipo_producto === 'bus') {
      product = await Bus.findById(producto.producto_id);
    } else if (producto.tipo_producto === 'vuelo') {
      product = await Flight.findById(producto.producto_id);
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
  } catch (error) {
    throw new Error('Error al actualizar la cantidad: ');
  }
};
