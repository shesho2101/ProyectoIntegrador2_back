import { Request, Response } from 'express';
import Flight from '../models/FlightModel';  // Modelo de MongoDB para Vuelos

// Obtener todos los vuelos
export const getFlights = async (req: Request, res: Response) => {
  try {
    const flights = await Flight.find();
    res.json({ vuelos: flights });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los vuelos' });
  }
};

// Obtener un vuelo por ID
export const getFlightById = async (req: Request, res: Response) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ error: 'Vuelo no encontrado' });
    }
    res.json({ vuelo: flight });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el vuelo' });
  }
};

// Crear un nuevo vuelo
export const createFlight = async (req: Request, res: Response) => {
  try {
    const { origen, destino, fecha_salida, fecha_llegada, precio, compania, duracion } = req.body;

    const newFlight = new Flight({
      origen,
      destino,
      fecha_salida,
      fecha_llegada,
      precio,
      compania,
      duracion
    });

    await newFlight.save();
    res.status(201).json({ message: 'Vuelo creado exitosamente', vuelo: newFlight });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el vuelo' });
  }
};

// Actualizar un vuelo por ID
export const updateFlight = async (req: Request, res: Response) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ error: 'Vuelo no encontrado' });
    }

    const { origen, destino, fecha_salida, fecha_llegada, precio, compania, duracion } = req.body;

    if (origen) flight.origen = origen;
    if (destino) flight.destino = destino;
    if (fecha_salida) flight.fecha_salida = fecha_salida;
    if (fecha_llegada) flight.fecha_llegada = fecha_llegada;
    if (precio) flight.precio = precio;
    if (compania) flight.compania = compania;
    if (duracion) flight.duracion = duracion;

    await flight.save();
    res.json({ message: 'Vuelo actualizado', vuelo: flight });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el vuelo' });
  }
};

// Eliminar un vuelo por ID
export const deleteFlight = async (req: Request, res: Response) => {
  try {
    const flight = await Flight.findById(req.params.id);
    if (!flight) {
      return res.status(404).json({ error: 'Vuelo no encontrado' });
    }

    await flight.remove();
    res.json({ message: 'Vuelo eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el vuelo' });
  }
};

// Filtrar vuelos por origen
export const getFlightsByOrigin = async (req: Request, res: Response) => {
  try {
    const { origen } = req.query;
    const flights = await Flight.find({ origen });
    res.json({ vuelos: flights });
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar vuelos por origen' });
  }
};

// Filtrar vuelos por destino
export const getFlightsByDestination = async (req: Request, res: Response) => {
  try {
    const { destino } = req.query;
    const flights = await Flight.find({ destino });
    res.json({ vuelos: flights });
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar vuelos por destino' });
  }
};

// Filtrar vuelos por precio
export const getFlightsByPrice = async (req: Request, res: Response) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const flights = await Flight.find({
      precio: { $gte: minPrice, $lte: maxPrice }
    });
    res.json({ vuelos: flights });
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar vuelos por precio' });
  }
};
