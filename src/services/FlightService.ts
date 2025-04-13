import Flight, { IFlight } from '../models/FlightModel';  // Asegúrate de que el modelo de vuelos esté bien creado

class FlightService {
  // Obtener todos los vuelos
  public static async getAllFlights() {
    try {
      const flights = await Flight.find();
      return flights;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al obtener los vuelos: ${error.message}`);
      }
      throw new Error('Error al obtener los vuelos');
    }
  }

  // Obtener un vuelo por ID
  public static async getFlightById(id: string) {
    try {
      const flight = await Flight.findById(id);
      if (!flight) {
        throw new Error('Vuelo no encontrado');
      }
      return flight;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al obtener el vuelo: ${error.message}`);
      }
      throw new Error('Error al obtener el vuelo');
    }
  }

  // Crear un nuevo vuelo
  public static async createFlight(flightData: any) {
    try {
      const newFlight = new Flight(flightData);
      await newFlight.save();
      return newFlight;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al crear el vuelo: ${error.message}`);
      }
      throw new Error('Error al crear el vuelo');
    }
  }

  // Actualizar un vuelo por ID
  public static async updateFlight(id: string, flightData: Partial<IFlight>) {
    try {
      const flight = await Flight.findById(id);
      if (!flight) {
        throw new Error('Vuelo no encontrado');
      }

      // Aquí usamos keyof IFlight para asegurar que solo accedemos a propiedades válidas de IFlight
      for (const key in flightData) {
        if (flightData.hasOwnProperty(key) && key in flight) {
          flight[key as keyof IFlight] = flightData[key]!;  // Usamos `!` para garantizar que flightData[key] no es undefined
        }
      }

      await flight.save();
      return flight;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al actualizar el vuelo: ${error.message}`);
      }
      throw new Error('Error al actualizar el vuelo');
    }
  }

  // Eliminar un vuelo por ID
  public static async deleteFlight(id: string) {
    try {
      const flight = await Flight.findById(id);
      if (!flight) {
        throw new Error('Vuelo no encontrado');
      }
      await flight.remove();
      return { message: 'Vuelo eliminado' };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al eliminar el vuelo: ${error.message}`);
      }
      throw new Error('Error al eliminar el vuelo');
    }
  }

  // Filtrar vuelos por origen
  public static async getFlightsByOrigin(origen: string) {
    try {
      const flights = await Flight.find({ origen });
      return flights;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al filtrar vuelos por origen: ${error.message}`);
      }
      throw new Error('Error al filtrar vuelos por origen');
    }
  }

  // Filtrar vuelos por destino
  public static async getFlightsByDestination(destino: string) {
    try {
      const flights = await Flight.find({ destino });
      return flights;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al filtrar vuelos por destino: ${error.message}`);
      }
      throw new Error('Error al filtrar vuelos por destino');
    }
  }

  // Filtrar vuelos por precio
  public static async getFlightsByPrice(minPrice: number, maxPrice: number) {
    try {
      const flights = await Flight.find({ precio: { $gte: minPrice, $lte: maxPrice } });
      return flights;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al filtrar vuelos por precio: ${error.message}`);
      }
      throw new Error('Error al filtrar vuelos por precio');
    }
  }

  // Filtrar vuelos por fecha de salida
  public static async getFlightsByDepartureTime(fecha_salida: Date) {
    try {
      const flights = await Flight.find({ fecha_salida: { $gte: fecha_salida } });
      return flights;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al filtrar vuelos por fecha de salida: ${error.message}`);
      }
      throw new Error('Error al filtrar vuelos por fecha de salida');
    }
  }

  // Filtrar vuelos por tipo
  public static async getFlightsByType(tipo_vuelo: string) {
    try {
      const flights = await Flight.find({ tipo_vuelo });
      return flights;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error al filtrar vuelos por tipo: ${error.message}`);
      }
      throw new Error('Error al filtrar vuelos por tipo');
    }
  }
}

export default FlightService;
