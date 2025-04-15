import { Request, Response } from 'express';
import BusService from '../services/BusService';  // Importamos el servicio de buses

// Obtener todos los buses
export const getBuses = async (req: Request, res: Response) => {
  try {
    const buses = await BusService.getAllBuses();
    res.json({ buses });
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los buses' });
  }
};

// Obtener un bus por ID
export const getBusById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const bus = await BusService.getBusById(id);
    const busWithOpinions = await bus.populate('opiniones');  // Cargar las opiniones
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
    const buses = await BusService.getBusesByOrigin(req.query.origen as string);
    res.json({ buses });
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar buses por origen' });
  }
};

// Filtrar buses por destino
export const getBusesByDestination = async (req: Request, res: Response) => {
  try {
    const buses = await BusService.getBusesByDestination(req.query.destino as string);
    res.json({ buses });
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar buses por destino' });
  }
};

// Filtrar buses por precio
export const getBusesByPrice = async (req: Request, res: Response) => {
  try {
    const { minPrice, maxPrice } = req.query;
    const buses = await BusService.getBusesByPrice(Number(minPrice), Number(maxPrice));
    res.json({ buses });
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar buses por precio' });
  }
};

// Filtrar buses por fecha de salida
export const getBusesByDepartureTime = async (req: Request, res: Response) => {
  try {
    const fecha_salida = new Date(req.query.fecha_salida as string);
    const buses = await BusService.getBusesByDepartureTime(fecha_salida);
    res.json({ buses });
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar buses por fecha de salida' });
  }
};

// Filtrar buses por tipo
export const getBusesByType = async (req: Request, res: Response) => {
  try {
    const buses = await BusService.getBusesByType(req.query.tipo_bus as string);
    res.json({ buses });
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar buses por tipo' });
  }
};
