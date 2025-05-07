"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReservation = exports.getAllReservations = exports.getReservationsByUser = exports.createReservation = void 0;
const ReservationModel_1 = __importDefault(require("../models/ReservationModel"));
const HotelModel_1 = __importDefault(require("../models/HotelModel"));
const createReservation = async (req, res) => {
    try {
        const { hotelId, fecha_inicio, fecha_fin } = req.body;
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'No autorizado' });
        }
        // Verificar que el hotel exista
        const hotel = await HotelModel_1.default.findById(hotelId);
        if (!hotel) {
            return res.status(404).json({ message: 'Hotel no encontrado' });
        }
        // Verificar solapamiento de fechas
        const reservasExistentes = await ReservationModel_1.default.find({
            hotel: hotelId,
            $or: [
                {
                    fecha_inicio: { $lte: fecha_fin },
                    fecha_fin: { $gte: fecha_inicio },
                },
            ],
        });
        if (reservasExistentes.length > 0) {
            return res.status(409).json({ message: 'Fechas no disponibles para este hotel' });
        }
        const nuevaReserva = await ReservationModel_1.default.create({
            usuario: userId,
            hotel: hotelId,
            fecha_inicio,
            fecha_fin,
        });
        res.status(201).json(nuevaReserva);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear la reserva', error });
    }
};
exports.createReservation = createReservation;
const getReservationsByUser = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: 'No autorizado' });
        }
        const reservas = await ReservationModel_1.default.find({ usuario: userId }).populate('hotel');
        res.status(200).json(reservas);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener reservas del usuario', error });
    }
};
exports.getReservationsByUser = getReservationsByUser;
const getAllReservations = async (req, res) => {
    try {
        const reservas = await ReservationModel_1.default.find().populate('usuario hotel');
        res.status(200).json(reservas);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener todas las reservas', error });
    }
};
exports.getAllReservations = getAllReservations;
const deleteReservation = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { id } = req.params;
        const reserva = await ReservationModel_1.default.findById(id);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }
        if (String(reserva.usuario) !== userId) {
            return res.status(403).json({ message: 'No tienes permiso para eliminar esta reserva' });
        }
        await ReservationModel_1.default.findByIdAndDelete(id);
        res.status(200).json({ message: 'Reserva eliminada correctamente' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al eliminar la reserva', error });
    }
};
exports.deleteReservation = deleteReservation;
