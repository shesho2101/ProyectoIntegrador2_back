"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/FlightService.ts
const FlightModel_1 = __importDefault(require("../models/FlightModel"));
class FlightService {
    // Todos los vuelos
    static async getAllFlights() {
        try {
            return await FlightModel_1.default.find();
        }
        catch {
            throw new Error('Error al obtener los vuelos');
        }
    }
    // Un vuelo por ID
    static async getFlightById(id) {
        const f = await FlightModel_1.default.findById(id);
        if (!f)
            throw new Error('Vuelo no encontrado');
        return f;
    }
    // Crear vuelo
    static async createFlight(data) {
        try {
            const vuelo = new FlightModel_1.default(data);
            await vuelo.save();
            return vuelo;
        }
        catch {
            throw new Error('Error al crear el vuelo');
        }
    }
    // Actualizar vuelo
    static async updateFlight(id, data) {
        const vuelo = await FlightModel_1.default.findById(id);
        if (!vuelo)
            throw new Error('Vuelo no encontrado');
        Object.assign(vuelo, data);
        await vuelo.save();
        return vuelo;
    }
    // Borrar vuelo
    static async deleteFlight(id) {
        const vuelo = await FlightModel_1.default.findById(id);
        if (!vuelo)
            throw new Error('Vuelo no encontrado');
        await vuelo.remove();
    }
    // Filtrar por origen
    static async getFlightsByOrigin(origen) {
        try {
            return await FlightModel_1.default.find({ origen });
        }
        catch {
            throw new Error('Error al filtrar vuelos por origen');
        }
    }
    // Filtrar por destino
    static async getFlightsByDestination(destino) {
        try {
            return await FlightModel_1.default.find({ destino });
        }
        catch {
            throw new Error('Error al filtrar vuelos por destino');
        }
    }
    // Filtrar por rango de precio
    static async getFlightsByPriceRange(min, max) {
        try {
            return await FlightModel_1.default.find({ precio: { $gte: min, $lte: max } });
        }
        catch {
            throw new Error('Error al filtrar vuelos por precio');
        }
    }
}
exports.default = FlightService;
