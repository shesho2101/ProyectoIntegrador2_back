// src/models/ReservationModel.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IReservation extends Document {
  usuario: mongoose.Types.ObjectId;
  hotel: mongoose.Types.ObjectId;
  fecha_inicio: Date;
  fecha_fin: Date;
}

const ReservationSchema = new Schema<IReservation>({
  usuario: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_fin: { type: Date, required: true },
});

const Reservation = mongoose.model<IReservation>('Reservation', ReservationSchema);
export default Reservation;
