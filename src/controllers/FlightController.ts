import { Request, Response } from 'express';
import FlightService from '../services/FlightService';

// Obtener todos los vuelos
export const getFlights = async (_req: Request, res: Response) => {
  try {
    const flights = await FlightService.getAllFlights();
    res.json(flights);
  } catch {
    res.status(500).json({ error: 'Error al obtener los vuelos' });
  }
};

// Obtener un vuelo por ID
export const getFlightById = async (req: Request, res: Response) => {
  try {
    const flight = await FlightService.getFlightById(req.params.id);
    res.json(flight);
  } catch {
    res.status(404).json({ error: 'Vuelo no encontrado' });
  }
};

// Crear un nuevo vuelo (Admin)
export const createFlight = async (req: Request, res: Response) => {
  try {
    const newFlight = await FlightService.createFlight(req.body);
    res.status(201).json(newFlight);
  } catch {
    res.status(500).json({ error: 'Error al crear el vuelo' });
  }
};

// Actualizar un vuelo por ID (Admin)
export const updateFlight = async (req: Request, res: Response) => {
  try {
    const updated = await FlightService.updateFlight(req.params.id, req.body);
    res.json(updated);
  } catch {
    res.status(500).json({ error: 'Error al actualizar el vuelo' });
  }
};

// Eliminar un vuelo por ID (Admin)
export const deleteFlight = async (req: Request, res: Response) => {
  try {
    await FlightService.deleteFlight(req.params.id);
    res.json({ message: 'Vuelo eliminado' });
  } catch {
    res.status(500).json({ error: 'Error al eliminar el vuelo' });
  }
};

// Filtrar vuelos por origen
export const getFlightsByOrigin = async (req: Request, res: Response) => {
  try {
    const flights = await FlightService.getFlightsByOrigin(req.params.origen);
    res.json(flights);
  } catch {
    res.status(500).json({ error: 'Error al filtrar vuelos por origen' });
  }
};

// Filtrar vuelos por destino
export const getFlightsByDestination = async (req: Request, res: Response) => {
  try {
    const flights = await FlightService.getFlightsByDestination(req.params.destino);
    res.json(flights);
  } catch {
    res.status(500).json({ error: 'Error al filtrar vuelos por destino' });
  }
};

// Filtrar vuelos por rango de precio
export const getFlightsByPriceRange = async (req: Request, res: Response) => {
  try {
    const min = Number(req.params.min);
    const max = Number(req.params.max);
    const flights = await FlightService.getFlightsByPriceRange(min, max);
    res.json(flights);
  } catch {
    res.status(500).json({ error: 'Error al filtrar vuelos por precio' });
  }
};
