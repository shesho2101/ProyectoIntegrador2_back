import { Router } from "express";
import { createReservation, getUserReservations, getAllReservations } from "../controllers/ReservationController";
import { verifyToken } from "../middlewares/AuthMiddleware";

const router = Router();

router.post("/", verifyToken, createReservation);
router.get("/user", verifyToken, getUserReservations);  // Ruta para obtener las reservas del usuario
router.get("/all", verifyToken, getAllReservations);    // Ruta para obtener todas las reservas (solo admin)

export default router;
