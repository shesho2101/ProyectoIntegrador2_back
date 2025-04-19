// src/services/FlightService.ts
import Flight, { IFlight } from '../models/FlightModel';

class FlightService {
  // Todos los vuelos
  public static async getAllFlights(): Promise<IFlight[]> {
    try {
      return await Flight.find();
    } catch {
      throw new Error('Error al obtener los vuelos');
    }
  }

  // Un vuelo por ID
  public static async getFlightById(id: string): Promise<IFlight> {
    const f = await Flight.findById(id);
    if (!f) throw new Error('Vuelo no encontrado');
    return f;
  }

  // Crear vuelo
  public static async createFlight(data: Partial<IFlight>): Promise<IFlight> {
    try {
      const vuelo = new Flight(data);
      await vuelo.save();
      return vuelo;
    } catch {
      throw new Error('Error al crear el vuelo');
    }
  }

  // Actualizar vuelo
  public static async updateFlight(id: string, data: Partial<IFlight>): Promise<IFlight> {
    const vuelo = await Flight.findById(id);
    if (!vuelo) throw new Error('Vuelo no encontrado');
    Object.assign(vuelo, data);
    await vuelo.save();
    return vuelo;
  }

  // Borrar vuelo
  public static async deleteFlight(id: string): Promise<void> {
    const vuelo = await Flight.findById(id);
    if (!vuelo) throw new Error('Vuelo no encontrado');
    await vuelo.remove();
  }

  // Filtrar por origen
  public static async getFlightsByOrigin(origen: string): Promise<IFlight[]> {
    try {
      return await Flight.find({ origen });
    } catch {
      throw new Error('Error al filtrar vuelos por origen');
    }
  }

  // Filtrar por destino
  public static async getFlightsByDestination(destino: string): Promise<IFlight[]> {
    try {
      return await Flight.find({ destino });
    } catch {
      throw new Error('Error al filtrar vuelos por destino');
    }
  }

  // Filtrar por rango de precio
  public static async getFlightsByPriceRange(min: number, max: number): Promise<IFlight[]> {
    try {
      return await Flight.find({ precio: { $gte: min, $lte: max } });
    } catch {
      throw new Error('Error al filtrar vuelos por precio');
    }
  }
}

export default FlightService;
