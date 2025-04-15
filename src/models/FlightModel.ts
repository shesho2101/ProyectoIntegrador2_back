import mongoose, { Schema, Document } from 'mongoose';
import { IOpinion } from './OpinionModel'; // Importamos la interfaz de Opinión


export interface IFlight extends Document {
  origen: string;
  destino: string;
  fecha_salida: Date;
  fecha_llegada: Date;
  precio: number;
  compania: string;
  duracion: number;  // Duración del vuelo en horas
  opiniones: IOpinion[];

  [key: string]: any; 

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
  opiniones: [{ type: Schema.Types.ObjectId, ref: 'Opinion' }] 
});

// Crear el modelo de Flight
const Flight = mongoose.model<IFlight>('Flight', FlightSchema);

export default Flight;
