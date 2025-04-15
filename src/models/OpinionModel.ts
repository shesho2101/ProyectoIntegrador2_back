import mongoose, { Schema, Document } from 'mongoose';

// Interfaz para la Opinión
export interface IOpinion extends Document {
  usuario_id: number;          // Usuario que dejó la opinión
  tipo_opinion: 'hotel' | 'vuelo' | 'bus';  // Tipo de elemento sobre el que se dejó la opinión
  referencia_mongo_id: string;  // ID del documento en MongoDB (referencia al hotel, vuelo o bus)
  calificacion: number;         // Calificación de la opinión (1 a 5)
  comentario: string;           // Comentario adicional de la opinión
  fecha_publicacion: Date;      // Fecha en la que se publicó la opinión
}

// Esquema para la Opinión
const OpinionSchema: Schema = new Schema({
  usuario_id: { type: Number, required: true },
  tipo_opinion: { type: String, enum: ['hotel', 'vuelo', 'bus'], required: true },
  referencia_mongo_id: { type: String, required: true },
  calificacion: { type: Number, required: true, min: 1, max: 5 },  // Calificación entre 1 y 5
  comentario: { type: String, required: true },
  fecha_publicacion: { type: Date, default: Date.now }
});

// Crear el modelo de Opinión
const Opinion = mongoose.model<IOpinion>('Opinion', OpinionSchema);

export default Opinion;
