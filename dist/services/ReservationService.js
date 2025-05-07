"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/ReservationService.ts
const ReservationModel_1 = __importDefault(require("../models/ReservationModel")); // Sequelize model
class ReservationService {
    /** Crea una nueva reserva */
    static async createReservation(data) {
        try {
            return await ReservationModel_1.default.create({
                usuario_id: data.usuario_id,
                tipo_reserva: data.tipo_reserva,
                referencia_mongo_id: data.referencia_mongo_id,
                fecha_reserva: data.fecha_reserva,
                estado: data.estado ?? 'pendiente'
            });
        }
        catch (err) {
            throw new Error('Error al crear la reserva');
        }
    }
    /** Devuelve todas las reservas (solo admin) */
    static async getAllReservations() {
        try {
            return await ReservationModel_1.default.findAll();
        }
        catch {
            throw new Error('Error al obtener todas las reservas');
        }
    }
    /** Busca una reserva por su ID */
    static async getReservationById(id) {
        const resv = await ReservationModel_1.default.findByPk(id);
        if (!resv)
            throw new Error('Reserva no encontrada');
        return resv;
    }
    /** Actualiza una reserva por su ID */
    static async updateReservation(id, updates) {
        const resv = await ReservationModel_1.default.findByPk(id);
        if (!resv)
            throw new Error('Reserva no encontrada');
        return await resv.update(updates);
    }
    /** Elimina una reserva por su ID */
    static async deleteReservation(id) {
        const resv = await ReservationModel_1.default.findByPk(id);
        if (!resv)
            throw new Error('Reserva no encontrada');
        await resv.destroy();
    }
    /** Obtiene todas las reservas de un usuario */
    static async getReservationsByUser(usuario_id) {
        try {
            return await ReservationModel_1.default.findAll({
                where: { usuario_id }
            });
        }
        catch {
            throw new Error('Error al obtener reservas por usuario');
        }
    }
    /** Obtiene reservas de un usuario filtradas por tipo */
    static async getReservationsByUserAndType(usuario_id, tipo_reserva) {
        try {
            return await ReservationModel_1.default.findAll({
                where: { usuario_id, tipo_reserva }
            });
        }
        catch {
            throw new Error('Error al obtener reservas por usuario y tipo');
        }
    }
    /** Historial de reservas de un usuario (orden descendente por fecha) */
    static async getReservationHistoryByUser(usuario_id) {
        try {
            return await ReservationModel_1.default.findAll({
                where: { usuario_id },
                order: [['fecha_reserva', 'DESC']]
            });
        }
        catch {
            throw new Error('Error al obtener el historial de reservas');
        }
    }
}
exports.default = ReservationService;
