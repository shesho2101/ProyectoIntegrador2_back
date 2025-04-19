import Reservation from '../models/ReservationModel';

class ReservationService {
  // Crear una nueva reserva
  public static async createReservation(data: any) {
    try {
      const newReservation = await Reservation.create(data);
      return newReservation;
    } catch (error) {
      throw new Error('Error al crear la reserva');
    }
  }

  // Obtener todas las reservas
  public static async getAllReservations() {
    try {
      const reservations = await Reservation.findAll();
      return reservations;
    } catch (error) {
      throw new Error('Error al obtener todas las reservas');
    }
  }

  // Obtener una reserva por ID
  public static async getReservationById(id: string) {
    try {
      const reservation = await Reservation.findByPk(id);
      if (!reservation) {
        throw new Error('Reserva no encontrada');
      }
      return reservation;
    } catch (error) {
      throw new Error('Error al obtener la reserva');
    }
  }

  // Actualizar una reserva por ID
  public static async updateReservation(id: string, data: any) {
    try {
      const reservation = await Reservation.findByPk(id);
      if (!reservation) {
        throw new Error('Reserva no encontrada');
      }
      await reservation.update(data);
      return reservation;
    } catch (error) {
      throw new Error('Error al actualizar la reserva');
    }
  }

  // Eliminar una reserva por ID
  public static async deleteReservation(id: string) {
    try {
      const reservation = await Reservation.findByPk(id);
      if (!reservation) {
        throw new Error('Reserva no encontrada');
      }
      await reservation.destroy();
      return { message: 'Reserva eliminada' };
    } catch (error) {
      throw new Error('Error al eliminar la reserva');
    }
  }

  // Filtrar reservas por estado
  public static async getReservationsByStatus(estado: string) {
    try {
      const reservations = await Reservation.findAll({ where: { estado } });
      return reservations;
    } catch (error) {
      throw new Error('Error al obtener las reservas por estado');
    }
  }

  // Filtrar reservas por usuario
  public static async getReservationsByUser(userId: number) {
    try {
      const reservations = await Reservation.findAll({ where: { usuario_id: userId } });
      return reservations;
    } catch (error) {
      throw new Error('Error al obtener las reservas por usuario');
    }
  }

  // Filtrar reservas por tipo
  public static async getReservationsByType(tipo_reserva: string) {
    try {
      const reservations = await Reservation.findAll({ where: { tipo_reserva } });
      return reservations;
    } catch (error) {
      throw new Error('Error al obtener las reservas por tipo');
    }
  }

  // Filtrar reservas por fecha de reserva
  public static async getReservationsByDate(fecha_reserva: string) {
    try {
      const reservations = await Reservation.findAll({ where: { fecha_reserva } });
      return reservations;
    } catch (error) {
      throw new Error('Error al obtener las reservas por fecha');
    }
  }

  // Filtrar reservas por usuario y tipo
  public static async getReservationsByUserAndType(usuario_id: string, tipo_reserva: string) {
    try {
      const reservations = await Reservation.findAll({
        where: { usuario_id, tipo_reserva },
      });
      return reservations;
    } catch (error) {
      throw new Error('Error al obtener las reservas por usuario y tipo');
    }
  }

   // Obtener el historial de reservas de un usuario
   public static async getReservationHistoryByUser(usuario_id: number) {
    try {
      return await Reservation.findAll({
        where: { usuario_id },
        order: [['fecha_reserva', 'DESC']]
      });
    } catch (error) {
      throw new Error('Error al obtener el historial de reservas');
    }
  }
}

export default ReservationService;
