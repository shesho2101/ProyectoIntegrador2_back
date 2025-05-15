import { Request, Response } from 'express';
import { getFilteredFlightsService, getAllFlightsService } from '../services/FlightService';

export const getFilteredFlights = async (req: Request, res: Response) => {
  try {
    const { tipoVuelo, origen, destino, salida } = req.query;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 9;

    // Limpieza de filtros
    const filtros: any = {};
    if (tipoVuelo) filtros.tipoVuelo = tipoVuelo;
    if (origen) filtros.origen = origen;
    if (destino) filtros.destino = destino;
    if (salida) filtros.salida = salida;

    const vuelos = await getFilteredFlightsService(filtros, page, limit);
    res.status(200).json(vuelos);
  } catch (error) {
    console.error('Error al obtener vuelos filtrados:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getAllFlights = async (req: Request, res: Response) => {
  try {
    const vuelos = await getAllFlightsService();
    res.status(200).json(vuelos);
  } catch (error) {
    console.error('Error al obtener todos los vuelos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};
