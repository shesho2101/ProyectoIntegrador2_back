// src/services/BusService.ts
import Bus, { IBus } from '../models/BusModel';

class BusService {
  // Obtener todos los buses
  public static async getAllBuses(): Promise<IBus[]> {
    try {
      return await Bus.find();
    } catch (error) {
      throw new Error('Error al obtener los buses');
    }
  }

  // Obtener un bus por ID
  public static async getBusById(id: string): Promise<IBus> {
    try {
      const bus = await Bus.findById(id);
      if (!bus) throw new Error('Bus no encontrado');
      return bus;
    } catch (error) {
      throw new Error('Error al obtener el bus');
    }
  }

  // Crear un nuevo bus
  public static async createBus(busData: Partial<IBus>): Promise<IBus> {
    try {
      const newBus = new Bus(busData);
      await newBus.save();
      return newBus;
    } catch (error) {
      throw new Error('Error al crear el bus');
    }
  }

  // Actualizar un bus por ID
  public static async updateBus(id: string, busData: Partial<IBus>): Promise<IBus> {
    try {
      const bus = await Bus.findById(id);
      if (!bus) throw new Error('Bus no encontrado');

      // Asignar solo las propiedades válidas de busData
      for (const key in busData) {
        if (busData.hasOwnProperty(key)) {
          (bus as any)[key] = busData[key as keyof IBus];
        }
      }

      await bus.save();
      return bus;
    } catch (error) {
      throw new Error('Error al actualizar el bus');
    }
  }

  // Eliminar un bus por ID
  public static async deleteBus(id: string): Promise<{ message: string }> {
    try {
      const bus = await Bus.findById(id);
      if (!bus) throw new Error('Bus no encontrado');
      await bus.remove();
      return { message: 'Bus eliminado' };
    } catch (error) {
      throw new Error('Error al eliminar el bus');
    }
  }

  // Filtrar buses por origen
  public static async getBusesByOrigin(origen: string): Promise<IBus[]> {
    try {
      return await Bus.find({ origen });
    } catch (error) {
      throw new Error('Error al filtrar buses por origen');
    }
  }

  // Filtrar buses por destino
  public static async getBusesByDestination(destino: string): Promise<IBus[]> {
    try {
      return await Bus.find({ destino });
    } catch (error) {
      throw new Error('Error al filtrar buses por destino');
    }
  }

  // Filtrar buses por rango de precio
  public static async getBusesByPrice(minPrice: number, maxPrice: number): Promise<IBus[]> {
    try {
      return await Bus.find({ precio: { $gte: minPrice, $lte: maxPrice } });
    } catch (error) {
      throw new Error('Error al filtrar buses por precio');
    }
  }

  // Filtrar buses por fecha de salida
  public static async getBusesByDepartureTime(fecha: Date): Promise<IBus[]> {
    try {
      return await Bus.find({ fecha_salida: { $gte: fecha } });
    } catch (error) {
      throw new Error('Error al filtrar buses por fecha de salida');
    }
  }

  // Filtrar buses por tipo
  public static async getBusesByType(tipo: string): Promise<IBus[]> {
    try {
      return await Bus.find({ tipo_bus: tipo });
    } catch (error) {
      throw new Error('Error al filtrar buses por tipo');
    }
  }
}

export default BusService;
