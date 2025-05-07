"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUniqueCities = exports.getHotelsByPriceRange = exports.getHotelsByCity = exports.deleteHotel = exports.updateHotel = exports.createHotel = exports.getHotelById = exports.getAllHotels = void 0;
const HotelService_1 = __importDefault(require("../services/HotelService"));
const HotelModel_1 = __importDefault(require("../models/HotelModel"));
// Obtener todos los hoteles
const getAllHotels = async (_req, res) => {
    try {
        const hotels = await HotelService_1.default.getAllHotels();
        res.json(hotels);
    }
    catch {
        res.status(500).json({ error: 'Error al obtener los hoteles' });
    }
};
exports.getAllHotels = getAllHotels;
// Obtener un hotel por ID
const getHotelById = async (req, res) => {
    try {
        const hotel = await HotelService_1.default.getHotelById(req.params.id);
        res.json(hotel);
    }
    catch {
        res.status(404).json({ error: 'Hotel no encontrado' });
    }
};
exports.getHotelById = getHotelById;
// Crear nuevo hotel (Admin)
const createHotel = async (req, res) => {
    try {
        const newHotel = await HotelService_1.default.createHotel(req.body);
        res.status(201).json(newHotel);
    }
    catch {
        res.status(500).json({ error: 'Error al crear el hotel' });
    }
};
exports.createHotel = createHotel;
// Actualizar hotel (Admin)
const updateHotel = async (req, res) => {
    try {
        const updated = await HotelService_1.default.updateHotel(req.params.id, req.body);
        res.json(updated);
    }
    catch {
        res.status(500).json({ error: 'Error al actualizar el hotel' });
    }
};
exports.updateHotel = updateHotel;
// Eliminar hotel (Admin)
const deleteHotel = async (req, res) => {
    try {
        await HotelService_1.default.deleteHotel(req.params.id);
        res.json({ message: 'Hotel eliminado' });
    }
    catch {
        res.status(500).json({ error: 'Error al eliminar el hotel' });
    }
};
exports.deleteHotel = deleteHotel;
// Filtrar hoteles por ciudad
const getHotelsByCity = async (req, res) => {
    try {
        const hotels = await HotelService_1.default.getHotelsByCity(req.params.ciudad);
        res.json(hotels);
    }
    catch {
        res.status(500).json({ error: 'Error al filtrar hoteles por ciudad' });
    }
};
exports.getHotelsByCity = getHotelsByCity;
// Filtrar hoteles por rango de precio
const getHotelsByPriceRange = async (req, res) => {
    try {
        const min = Number(req.params.min);
        const max = Number(req.params.max);
        const hotels = await HotelService_1.default.getHotelsByPriceRange(min, max);
        res.json(hotels);
    }
    catch {
        res.status(500).json({ error: 'Error al filtrar hoteles por precio' });
    }
};
exports.getHotelsByPriceRange = getHotelsByPriceRange;
const getUniqueCities = async (req, res) => {
    try {
        const ciudades = await HotelModel_1.default.distinct('ciudad');
        res.status(200).json(ciudades.sort());
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener las ciudades únicas' });
    }
};
exports.getUniqueCities = getUniqueCities;
