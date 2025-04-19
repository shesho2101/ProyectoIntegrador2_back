import mongoose, { Schema, Document } from 'mongoose';
import { IOpinion } from './OpinionModel'; 

export interface IBus extends Document {
  origen: string;
  destino: string;
  fecha_salida: Date;
  fecha_llegada: Date;
  precio: number;
  compania: string;
  duracion: number;
  tipo_bus: string;
  opiniones: IOpinion[];

  [key: string]: any; 
}

// Esquema para el Bus
const BusSchema: Schema = new Schema(
  {
    origen:       { type: String, required: true, index: true },
    destino:      { type: String, required: true, index: true },
    fecha_salida: { type: Date,   required: true },
    fecha_llegada:{ type: Date,   required: true },
    precio:       { type: Number, required: true, index: true },
    compania:     { type: String, required: true },
    duracion:     { type: Number, required: true },
    tipo_bus:     { type: String, required: true },
    opiniones:    [{ type: Schema.Types.ObjectId, ref: 'Opinion' }]
  },
  {
    timestamps: true  // createdAt / updatedAt automáticos
  }
);

// Crear el modelo de Bus
const Bus = mongoose.model<IBus>('Bus', BusSchema);

export default Bus;
