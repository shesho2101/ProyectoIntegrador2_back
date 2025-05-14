import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  usuario_id: {
    type: Number, // ← ya no será ObjectId
    required: true,
  },
  hotel_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hotel",
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
