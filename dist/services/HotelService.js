"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/HotelService.ts
const HotelModel_1 = __importDefault(require("../models/HotelModel"));
class HotelService {
    // Todos los hoteles
    static async getAllHotels() {
        try {
            return await HotelModel_1.default.find();
        }
        catch {
            throw new Error('Error al obtener todos los hoteles');
        }
    }
    // Hotel por ID
    static async getHotelById(id) {
        const h = await HotelModel_1.default.findById(id);
        if (!h)
            throw new Error('Hotel no encontrado');
        return h;
    }
    // Crear hotel
    static async createHotel(data) {
        try {
            const hotel = new HotelModel_1.default(data);
            await hotel.save();
            return hotel;
        }
        catch {
            throw new Error('Error al crear el hotel');
        }
    }
    // Actualizar hotel
    static async updateHotel(id, data) {
        const hotel = await HotelModel_1.default.findById(id);
        if (!hotel)
            throw new Error('Hotel no encontrado');
        Object.assign(hotel, data);
        await hotel.save();
        return hotel;
    }
    // Eliminar hotel
    static async deleteHotel(id) {
        const hotel = await HotelModel_1.default.findById(id);
        if (!hotel)
            throw new Error('Hotel no encontrado');
        await hotel.remove();
    }
    // Filtrar por ciudad
    static async getHotelsByCity(ciudad) {
        try {
            return await HotelModel_1.default.find({ ciudad });
        }
        catch {
            throw new Error('Error al filtrar hoteles por ciudad');
        }
    }
    // Filtrar por rango de precio
    static async getHotelsByPriceRange(min, max) {
        try {
            return await HotelModel_1.default.find({ precio: { $gte: min, $lte: max } });
        }
        catch {
            throw new Error('Error al filtrar hoteles por precio');
        }
    }
}
exports.default = HotelService;
