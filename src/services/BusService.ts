import Bus, { IBus } from '../models/BusModel';

class BusService {
  // Obtener todos los buses
  public static async getAllBuses() {
    try {
      const buses = await Bus.find();
      return buses;
    } catch (error) {
      throw new Error('Error al obtener los buses');
    }
  }

  // Obtener un bus por ID
  public static async getBusById(id: string) {
    try {
      const bus = await Bus.findById(id);
      if (!bus) {
        throw new Error('Bus no encontrado');
      }
      return bus;
    } catch (error) {
      throw new Error('Error al obtener el bus');
    }
  }

  // Crear un nuevo bus
  public static async createBus(busData: any) {
    try {
      const newBus = new Bus(busData);
      await newBus.save();
      return newBus;
    } catch (error) {
      throw new Error('Error al crear el bus');
    }
  }

  // Actualizar un bus por ID
  public static async updateBus(id: string, busData: Partial<IBus>) {
    try {
      const bus = await Bus.findById(id);
      if (!bus) {
        throw new Error('Bus no encontrado');
      }

      // Aquí usamos keyof IBus para asegurar que solo accedemos a propiedades válidas de IBus
      // Cambiamos la lógica a un enfoque más seguro
      for (const key in busData) {
        if (busData.hasOwnProperty(key) && key in bus) {
          // Tipo seguro: bus[key] es una propiedad válida de IBus
          bus[key as keyof IBus] = busData[key]!;  // Usamos `!` para garantizar que busData[key] no es undefined
        }
      }

      await bus.save();
      return bus;
    } catch (error) {
      throw new Error('Error al actualizar el bus');
    }
  }

  // Eliminar un bus por ID
  public static async deleteBus(id: string) {
    try {
      const bus = await Bus.findById(id);
      if (!bus) {
        throw new Error('Bus no encontrado');
      }
      await bus.remove();
      return { message: 'Bus eliminado' };
    } catch (error) {
      throw new Error('Error al eliminar el bus');
    }
  }

  // Filtrar buses por origen
  public static async getBusesByOrigin(origen: string) {
    try {
      const buses = await Bus.find({ origen });
      return buses;
    } catch (error) {
      throw new Error('Error al filtrar buses por origen');
    }
  }

  // Filtrar buses por destino
  public static async getBusesByDestination(destino: string) {
    try {
      const buses = await Bus.find({ destino });
      return buses;
    } catch (error) {
      throw new Error('Error al filtrar buses por destino');
    }
  }

  // Filtrar buses por precio
  public static async getBusesByPrice(minPrice: number, maxPrice: number) {
    try {
      const buses = await Bus.find({ precio: { $gte: minPrice, $lte: maxPrice } });
      return buses;
    } catch (error) {
      throw new Error('Error al filtrar buses por precio');
    }
  }

  // Filtrar buses por fecha de salida
  public static async getBusesByDepartureTime(fecha_salida: Date) {
    try {
      const buses = await Bus.find({ fecha_salida: { $gte: fecha_salida } });
      return buses;
    } catch (error) {
      throw new Error('Error al filtrar buses por fecha de salida');
    }
  }

  // Filtrar buses por tipo
  public static async getBusesByType(tipo_bus: string) {
    try {
      const buses = await Bus.find({ tipo_bus });
      return buses;
    } catch (error) {
      throw new Error('Error al filtrar buses por tipo');
    }
  }
}

export default BusService;
