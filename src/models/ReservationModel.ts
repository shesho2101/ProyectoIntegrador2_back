import mongoose from "mongoose";

import Hotel from "./HotelModel";

const reservationSchema = new mongoose.Schema({
  usuario_id: {
    type: Number, // ← ya no será ObjectId
    required: true,
  },
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel", // Refleja la relación entre reserva y hotel
    required: true,
  },
  fecha_inicio: {
    type: Date,
    required: true,
  },
  fecha_fin: {
    type: Date,
    required: true,
  },
});

export default mongoose.model("Reservation", reservationSchema);
