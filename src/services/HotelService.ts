import Hotel, { IHotel } from '../models/HotelModel';

class HotelService {
  // Obtener todos los hoteles
  public static async getAllHotels(): Promise<IHotel[]> {
    try {
      const hotels = await Hotel.find();
      return hotels;
    } catch (error) {
      throw new Error(`Error al obtener los hoteles: ${error.message || error}`);
    }
  }

  // Obtener un hotel por ID
  public static async getHotelById(id: string): Promise<IHotel | null> {
    try {
      const hotel = await Hotel.findById(id);
      if (!hotel) {
        throw new Error('Hotel no encontrado');
      }
      return hotel;
    } catch (error) {
      throw new Error(`Error al obtener el hotel: ${error.message || error}`);
    }
  }

  // Crear un nuevo hotel
  public static async createHotel(hotelData: IHotel): Promise<IHotel> {
    try {
      const newHotel = new Hotel(hotelData);
      await newHotel.save();
      return newHotel;
    } catch (error) {
      throw new Error(`Error al crear el hotel: ${error.message || error}`);
    }
  }

  // Actualizar un hotel por ID
  public static async updateHotel(id: string, hotelData: Partial<IHotel>): Promise<IHotel> {
    try {
      const hotel = await Hotel.findById(id);
      if (!hotel) {
        throw new Error('Hotel no encontrado');
      }

      // Actualizamos dinámicamente las propiedades del hotel
      for (const key in hotelData) {
        if (hotelData.hasOwnProperty(key)) {
          (hotel as any)[key] = hotelData[key];  // Acceso dinámico
        }
      }

      await hotel.save();
      return hotel;
    } catch (error) {
      throw new Error(`Error al actualizar el hotel: ${error.message || error}`);
    }
  }

  // Eliminar un hotel por ID
  public static async deleteHotel(id: string): Promise<{ message: string }> {
    try {
      const hotel = await Hotel.findById(id);
      if (!hotel) {
        throw new Error('Hotel no encontrado');
      }
      await hotel.remove();
      return { message: 'Hotel eliminado' };
    } catch (error) {
      throw new Error(`Error al eliminar el hotel: ${error.message || error}`);
    }
  }

  // Filtrar hoteles por ciudad
  public static async getHotelsByCity(ciudad: string): Promise<IHotel[]> {
    try {
      const hotels = await Hotel.find({ ciudad });
      return hotels;
    } catch (error) {
      throw new Error(`Error al filtrar hoteles por ciudad: ${error.message || error}`);
    }
  }

  // Filtrar hoteles por precio
  public static async getHotelsByPrice(minPrice: number, maxPrice: number): Promise<IHotel[]> {
    try {
      const hotels = await Hotel.find({ precio: { $gte: minPrice, $lte: maxPrice } });
      return hotels;
    } catch (error) {
      throw new Error(`Error al filtrar hoteles por precio: ${error.message || error}`);
    }
  }

  // Filtrar hoteles por rating
  public static async getHotelsByRating(rating: number): Promise<IHotel[]> {
    try {
      const hotels = await Hotel.find({ rating: { $gte: rating } });
      return hotels;
    } catch (error) {
      throw new Error(`Error al filtrar hoteles por rating: ${error.message || error}`);
    }
  }

  // Filtrar hoteles por disponibilidad
  public static async getHotelsByAvailability(disponibilidad: boolean): Promise<IHotel[]> {
    try {
      const hotels = await Hotel.find({ disponibilidad });
      return hotels;
    } catch (error) {
      throw new Error(`Error al filtrar hoteles por disponibilidad: ${error.message || error}`);
    }
  }
}

export default HotelService;
