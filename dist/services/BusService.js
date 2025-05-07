"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/services/BusService.ts
const BusModel_1 = __importDefault(require("../models/BusModel"));
class BusService {
    // Obtener todos los buses
    static async getAllBuses() {
        try {
            return await BusModel_1.default.find();
        }
        catch (error) {
            throw new Error('Error al obtener los buses');
        }
    }
    // Obtener un bus por ID
    static async getBusById(id) {
        try {
            const bus = await BusModel_1.default.findById(id);
            if (!bus)
                throw new Error('Bus no encontrado');
            return bus;
        }
        catch (error) {
            throw new Error('Error al obtener el bus');
        }
    }
    // Crear un nuevo bus
    static async createBus(busData) {
        try {
            const newBus = new BusModel_1.default(busData);
            await newBus.save();
            return newBus;
        }
        catch (error) {
            throw new Error('Error al crear el bus');
        }
    }
    // Actualizar un bus por ID
    static async updateBus(id, busData) {
        try {
            const bus = await BusModel_1.default.findById(id);
            if (!bus)
                throw new Error('Bus no encontrado');
            // Asignar solo las propiedades válidas de busData
            for (const key in busData) {
                if (busData.hasOwnProperty(key)) {
                    bus[key] = busData[key];
                }
            }
            await bus.save();
            return bus;
        }
        catch (error) {
            throw new Error('Error al actualizar el bus');
        }
    }
    // Eliminar un bus por ID
    static async deleteBus(id) {
        try {
            const bus = await BusModel_1.default.findById(id);
            if (!bus)
                throw new Error('Bus no encontrado');
            await bus.remove();
            return { message: 'Bus eliminado' };
        }
        catch (error) {
            throw new Error('Error al eliminar el bus');
        }
    }
    // Filtrar buses por origen
    static async getBusesByOrigin(origen) {
        try {
            return await BusModel_1.default.find({ origen });
        }
        catch (error) {
            throw new Error('Error al filtrar buses por origen');
        }
    }
    // Filtrar buses por destino
    static async getBusesByDestination(destino) {
        try {
            return await BusModel_1.default.find({ destino });
        }
        catch (error) {
            throw new Error('Error al filtrar buses por destino');
        }
    }
    // Filtrar buses por rango de precio
    static async getBusesByPrice(minPrice, maxPrice) {
        try {
            return await BusModel_1.default.find({ precio: { $gte: minPrice, $lte: maxPrice } });
        }
        catch (error) {
            throw new Error('Error al filtrar buses por precio');
        }
    }
    // Filtrar buses por fecha de salida
    static async getBusesByDepartureTime(fecha) {
        try {
            return await BusModel_1.default.find({ fecha_salida: { $gte: fecha } });
        }
        catch (error) {
            throw new Error('Error al filtrar buses por fecha de salida');
        }
    }
    // Filtrar buses por tipo
    static async getBusesByType(tipo) {
        try {
            return await BusModel_1.default.find({ tipo_bus: tipo });
        }
        catch (error) {
            throw new Error('Error al filtrar buses por tipo');
        }
    }
}
exports.default = BusService;
