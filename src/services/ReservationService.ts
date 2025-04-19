// src/services/ReservationService.ts
import Reservation from '../models/ReservationModel'; // Sequelize model
import { Op } from 'sequelize';

class ReservationService {
  /** Crea una nueva reserva */
  public static async createReservation(data: {
    usuario_id: number;
    tipo_reserva: 'hotel' | 'vuelo' | 'bus';
    referencia_mongo_id: string;
    fecha_reserva: Date;
    estado?: 'pendiente' | 'confirmada' | 'cancelada';
  }) {
    try {
      return await Reservation.create({
        usuario_id: data.usuario_id,
        tipo_reserva: data.tipo_reserva,
        referencia_mongo_id: data.referencia_mongo_id,
        fecha_reserva: data.fecha_reserva,
        estado: data.estado ?? 'pendiente'
      });
    } catch (err) {
      throw new Error('Error al crear la reserva');
    }
  }

  /** Devuelve todas las reservas (solo admin) */
  public static async getAllReservations() {
    try {
      return await Reservation.findAll();
    } catch {
      throw new Error('Error al obtener todas las reservas');
    }
  }

  /** Busca una reserva por su ID */
  public static async getReservationById(id: number) {
    const resv = await Reservation.findByPk(id);
    if (!resv) throw new Error('Reserva no encontrada');
    return resv;
  }

  /** Actualiza una reserva por su ID */
  public static async updateReservation(
    id: number,
    updates: Partial<{
      tipo_reserva: 'hotel' | 'vuelo' | 'bus';
      referencia_mongo_id: string;
      fecha_reserva: Date;
      estado: 'pendiente' | 'confirmada' | 'cancelada';
    }>
  ) {
    const resv = await Reservation.findByPk(id);
    if (!resv) throw new Error('Reserva no encontrada');
    return await resv.update(updates);
  }

  /** Elimina una reserva por su ID */
  public static async deleteReservation(id: number) {
    const resv = await Reservation.findByPk(id);
    if (!resv) throw new Error('Reserva no encontrada');
    await resv.destroy();
  }

  /** Obtiene todas las reservas de un usuario */
  public static async getReservationsByUser(usuario_id: number) {
    try {
      return await Reservation.findAll({
        where: { usuario_id }
      });
    } catch {
      throw new Error('Error al obtener reservas por usuario');
    }
  }

  /** Obtiene reservas de un usuario filtradas por tipo */
  public static async getReservationsByUserAndType(
    usuario_id: number,
    tipo_reserva: 'hotel' | 'vuelo' | 'bus'
  ) {
    try {
      return await Reservation.findAll({
        where: { usuario_id, tipo_reserva }
      });
    } catch {
      throw new Error('Error al obtener reservas por usuario y tipo');
    }
  }

  /** Historial de reservas de un usuario (orden descendente por fecha) */
  public static async getReservationHistoryByUser(usuario_id: number) {
    try {
      return await Reservation.findAll({
        where: { usuario_id },
        order: [['fecha_reserva', 'DESC']]
      });
    } catch {
      throw new Error('Error al obtener el historial de reservas');
    }
  }
}

export default ReservationService;
