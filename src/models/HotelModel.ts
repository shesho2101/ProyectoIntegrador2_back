import mongoose, { Schema, Document } from 'mongoose';
import { IOpinion } from './OpinionModel'; 

export interface IHotel extends Document {
  nombre: string;
  ciudad: string;
  precio: number;
  rating: number;
  descripcion: string;
  ubicacion: string;
  facilidades: string[];
  opiniones: IOpinion[];
  imagenes: string[]; // Nuevo campo para URLs de imágenes
  [key: string]: any;  
}

const HotelSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  ciudad: { type: String, required: true },
  precio: { type: Number, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  descripcion: { type: String, required: true },
  ubicacion: { type: String, required: true },
  facilidades: { type: [String], required: true },
  imagenes: { type: [String], default: [] }, // Lista de URLs
  opiniones: [{ type: Schema.Types.ObjectId, ref: 'Opinion' }]
});


// Crear el modelo de Hotel
const Hotel = mongoose.model<IHotel>('Hotel', HotelSchema);

export default Hotel;
