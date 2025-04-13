import mongoose, { Schema, Document } from 'mongoose';

export interface IFlight extends Document {
  origen: string;
  destino: string;
  fecha_salida: Date;
  fecha_llegada: Date;
  precio: number;
  compania: string;
  duracion: number;  // Duración del vuelo en horas

  [key: string]: any;  // Esto permite acceder dinámicamente a las propiedades de IBus

}

// Esquema para el Vuelo
const FlightSchema: Schema = new Schema({
  origen: { type: String, required: true },
  destino: { type: String, required: true },
  fecha_salida: { type: Date, required: true },
  fecha_llegada: { type: Date, required: true },
  precio: { type: Number, required: true },
  compania: { type: String, required: true },
  duracion: { type: Number, required: true },
});

// Crear el modelo de Flight
const Flight = mongoose.model<IFlight>('Flight', FlightSchema);

export default Flight;
