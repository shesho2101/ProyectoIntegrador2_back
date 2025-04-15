import mongoose, { Schema, Document } from 'mongoose';

// Interfaz para la Opinión
export interface IOpinion extends Document {
  usuario_id: number;         
  tipo_opinion: 'hotel' | 'vuelo' | 'bus';  
  referencia_mongo_id: string;  
  calificacion: number;         
  comentario: string;           
  fecha_publicacion: Date;      
}

// Esquema para la Opinión
const OpinionSchema: Schema = new Schema({
  usuario_id: { type: Number, required: true },
  tipo_opinion: { type: String, enum: ['hotel', 'vuelo', 'bus'], required: true },
  referencia_mongo_id: { type: String, required: true },
  calificacion: { type: Number, required: true, min: 1, max: 5 }, 
  comentario: { type: String, required: true },
  fecha_publicacion: { type: Date, default: Date.now }
});

// Crear el modelo de Opinión
const Opinion = mongoose.model<IOpinion>('Opinion', OpinionSchema);

export default Opinion;
