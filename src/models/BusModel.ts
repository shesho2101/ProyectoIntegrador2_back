import mongoose, { Schema, Document } from 'mongoose';

// Definimos el tipo IBus
export interface IBus extends Document {
  origen: string;
  destino: string;
  fecha_salida: Date;
  fecha_llegada: Date;
  precio: number;
  compania: string;
  duracion: number;
  tipo_bus: string;

  // Firma de índice: cualquier clave de tipo string puede acceder a propiedades de tipo string
  [key: string]: any;  // Esto permite acceder dinámicamente a las propiedades de IBus
}

// Esquema para el Bus
const BusSchema: Schema = new Schema({
  origen: { type: String, required: true },
  destino: { type: String, required: true },
  fecha_salida: { type: Date, required: true },
  fecha_llegada: { type: Date, required: true },
  precio: { type: Number, required: true },
  compania: { type: String, required: true },
  duracion: { type: Number, required: true },
  tipo_bus: { type: String, required: true },
});

// Crear el modelo de Bus
const Bus = mongoose.model<IBus>('Bus', BusSchema);

export default Bus;
