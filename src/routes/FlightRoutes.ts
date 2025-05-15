import express from 'express';
import {
  getFilteredFlights,
  getAllFlights
} from '../controllers/FlightController';

const router = express.Router();

router.get('/', getAllFlights);
router.get('/filtered', getFilteredFlights); // Asegúrate de que el frontend llama a esta ruta

export default router;
