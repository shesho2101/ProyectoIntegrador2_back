import mongoose, { Schema, Document } from 'mongoose';
import { IOpinion } from './OpinionModel'; // Importamos la interfaz de Opinión

export interface IHotel extends Document {
  nombre: string;
  ciudad: string;
  precio: number;
  rating: number;
  descripcion: string;
  ubicacion: string;
  facilidades: string[];
  opiniones: IOpinion[];


  [key: string]: any;  // Esto permite acceder dinámicamente a las propiedades de IBus
}

// Esquema para el Hotel
const HotelSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  ciudad: { type: String, required: true },
  precio: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },  // Rating entre 1 y 5
  descripcion: { type: String, required: true },
  ubicacion: { type: String, required: true },
  facilidades: { type: [String], required: true },  // Facilidades como un array de strings
  opiniones: [{ type: Schema.Types.ObjectId, ref: 'Opinion' }]
});

// Crear el modelo de Hotel
const Hotel = mongoose.model<IHotel>('Hotel', HotelSchema);

export default Hotel;
