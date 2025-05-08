import { Router } from "express";
import { createReservation, getUserReservations, getAllReservations } from "../controllers/ReservationController";
import { verifyToken } from "../middlewares/AuthMiddleware";

const router = Router();

router.post("/", verifyToken, createReservation);
router.get("/user", verifyToken, getUserReservations);
router.get("/all", verifyToken, getAllReservations);

export default router;
