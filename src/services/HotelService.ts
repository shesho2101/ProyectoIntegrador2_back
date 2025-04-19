// src/services/HotelService.ts
import Hotel, { IHotel } from '../models/HotelModel';

class HotelService {
  // Todos los hoteles
  public static async getAllHotels(): Promise<IHotel[]> {
    try {
      return await Hotel.find();
    } catch {
      throw new Error('Error al obtener todos los hoteles');
    }
  }

  // Hotel por ID
  public static async getHotelById(id: string): Promise<IHotel> {
    const h = await Hotel.findById(id);
    if (!h) throw new Error('Hotel no encontrado');
    return h;
  }

  // Crear hotel
  public static async createHotel(data: Partial<IHotel>): Promise<IHotel> {
    try {
      const hotel = new Hotel(data);
      await hotel.save();
      return hotel;
    } catch {
      throw new Error('Error al crear el hotel');
    }
  }

  // Actualizar hotel
  public static async updateHotel(id: string, data: Partial<IHotel>): Promise<IHotel> {
    const hotel = await Hotel.findById(id);
    if (!hotel) throw new Error('Hotel no encontrado');
    Object.assign(hotel, data);
    await hotel.save();
    return hotel;
  }

  // Eliminar hotel
  public static async deleteHotel(id: string): Promise<void> {
    const hotel = await Hotel.findById(id);
    if (!hotel) throw new Error('Hotel no encontrado');
    await hotel.remove();
  }

  // Filtrar por ciudad
  public static async getHotelsByCity(ciudad: string): Promise<IHotel[]> {
    try {
      return await Hotel.find({ ciudad });
    } catch {
      throw new Error('Error al filtrar hoteles por ciudad');
    }
  }

  // Filtrar por rango de precio
  public static async getHotelsByPriceRange(min: number, max: number): Promise<IHotel[]> {
    try {
      return await Hotel.find({ precio: { $gte: min, $lte: max } });
    } catch {
      throw new Error('Error al filtrar hoteles por precio');
    }
  }
}

export default HotelService;
