import { Request, Response } from 'express';
import BusService from '../services/BusService';  

// Obtener todos los buses
export const getBuses = async (req: Request, res: Response) => {
  try {
    const buses = await BusService.getAllBuses();

    const busesFormateados = buses.map(bus => ({
      ...bus.toObject(),
      fecha_salida: bus.fecha_salida ? bus.fecha_salida.toISOString() : null,
      fecha_llegada: bus.fecha_llegada ? bus.fecha_llegada.toISOString() : null,
      duracion: typeof bus.duracion === 'number' ? bus.duracion : 0,
      precio: typeof bus.precio === 'number' ? bus.precio : 0,
    }));

    res.json({ buses: busesFormateados });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los buses' });
  }
};

// Obtener un bus por ID
export const getBusById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const bus = await BusService.getBusById(id);
    const busWithOpinions = await bus.populate('opiniones'); 
    res.json(busWithOpinions);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el bus' });
  }
};

// Crear un nuevo bus
export const createBus = async (req: Request, res: Response) => {
  try {
    const busData = req.body;
    const newBus = await BusService.createBus(busData);
    res.status(201).json({ message: 'Bus creado exitosamente', bus: newBus });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el bus' });
  }
};

// Actualizar un bus por ID
export const updateBus = async (req: Request, res: Response) => {
  try {
    const busData = req.body;
    const bus = await BusService.updateBus(req.params.id, busData);
    res.json({ message: 'Bus actualizado', bus });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el bus' });
  }
};

// Eliminar un bus por ID
export const deleteBus = async (req: Request, res: Response) => {
  try {
    const result = await BusService.deleteBus(req.params.id);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el bus' });
  }
};

// Filtrar buses por origen
export const getBusesByOrigin = async (req: Request, res: Response) => {
  try {
    const { origen } = req.params;
    const buses = await BusService.getBusesByOrigin(origen);
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: 'Error al filtrar buses por origen' });
  }
};

// Filtrar buses por destino
export const getBusesByDestination = async (req: Request, res: Response) => {
  try {
    const { destino } = req.params;
    const buses = await BusService.getBusesByDestination(destino);
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: 'Error al filtrar buses por destino' });
  }
};

// Filtrar buses por rango de precio
export const getBusesByPriceRange = async (req: Request, res: Response) => {
  try {
    const min = Number(req.params.min);
    const max = Number(req.params.max);
    const buses = await BusService.getBusesByPrice(min, max);
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: 'Error al filtrar buses por precio' });
  }
};

// Filtrar buses por fecha de salida
export const getBusesByDepartureTime = async (req: Request, res: Response) => {
  try {
    const fecha = new Date(req.params.fecha);
    const buses = await BusService.getBusesByDepartureTime(fecha);
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: 'Error al filtrar buses por fecha de salida' });
  }
};

// Filtrar buses por tipo
export const getBusesByType = async (req: Request, res: Response) => {
  try {
    const { tipo } = req.params;
    const buses = await BusService.getBusesByType(tipo);
    res.json(buses);
  } catch (err) {
    res.status(500).json({ error: 'Error al filtrar buses por tipo' });
  }
};