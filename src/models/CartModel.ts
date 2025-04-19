import mongoose, { Schema, Document } from 'mongoose';

export interface ICart extends Document {
  usuario_id: number;  // Cambiar a number
  productos: Array<{
    producto_id: string;
    tipo_producto: string;
    cantidad: number;
    precio_total: number;
  }>;
  total: number;
  fecha_creacion: Date;
}

const CartSchema: Schema = new Schema(
  {
    usuario_id: { type: Number, required: true },  // Cambiar a Number
    productos: [
      {
        producto_id: { type: String, required: true },
        tipo_producto: { type: String, required: true },
        cantidad: { type: Number, required: true },
        precio_total: { type: Number, required: true },
      },
    ],
    total: { type: Number, required: true, default: 0 },
    fecha_creacion: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Cart = mongoose.model<ICart>('Cart', CartSchema);

export default Cart;
