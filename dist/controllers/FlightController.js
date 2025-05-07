"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFlightsByPriceRange = exports.getFlightsByDestination = exports.getFlightsByOrigin = exports.deleteFlight = exports.updateFlight = exports.createFlight = exports.getFlightById = exports.getFlights = void 0;
const FlightService_1 = __importDefault(require("../services/FlightService"));
// Obtener todos los vuelos
const getFlights = async (_req, res) => {
    try {
        const flights = await FlightService_1.default.getAllFlights();
        res.json(flights);
    }
    catch {
        res.status(500).json({ error: 'Error al obtener los vuelos' });
    }
};
exports.getFlights = getFlights;
// Obtener un vuelo por ID
const getFlightById = async (req, res) => {
    try {
        const flight = await FlightService_1.default.getFlightById(req.params.id);
        res.json(flight);
    }
    catch {
        res.status(404).json({ error: 'Vuelo no encontrado' });
    }
};
exports.getFlightById = getFlightById;
// Crear un nuevo vuelo (Admin)
const createFlight = async (req, res) => {
    try {
        const newFlight = await FlightService_1.default.createFlight(req.body);
        res.status(201).json(newFlight);
    }
    catch {
        res.status(500).json({ error: 'Error al crear el vuelo' });
    }
};
exports.createFlight = createFlight;
// Actualizar un vuelo por ID (Admin)
const updateFlight = async (req, res) => {
    try {
        const updated = await FlightService_1.default.updateFlight(req.params.id, req.body);
        res.json(updated);
    }
    catch {
        res.status(500).json({ error: 'Error al actualizar el vuelo' });
    }
};
exports.updateFlight = updateFlight;
// Eliminar un vuelo por ID (Admin)
const deleteFlight = async (req, res) => {
    try {
        await FlightService_1.default.deleteFlight(req.params.id);
        res.json({ message: 'Vuelo eliminado' });
    }
    catch {
        res.status(500).json({ error: 'Error al eliminar el vuelo' });
    }
};
exports.deleteFlight = deleteFlight;
// Filtrar vuelos por origen
const getFlightsByOrigin = async (req, res) => {
    try {
        const flights = await FlightService_1.default.getFlightsByOrigin(req.params.origen);
        res.json(flights);
    }
    catch {
        res.status(500).json({ error: 'Error al filtrar vuelos por origen' });
    }
};
exports.getFlightsByOrigin = getFlightsByOrigin;
// Filtrar vuelos por destino
const getFlightsByDestination = async (req, res) => {
    try {
        const flights = await FlightService_1.default.getFlightsByDestination(req.params.destino);
        res.json(flights);
    }
    catch {
        res.status(500).json({ error: 'Error al filtrar vuelos por destino' });
    }
};
exports.getFlightsByDestination = getFlightsByDestination;
// Filtrar vuelos por rango de precio
const getFlightsByPriceRange = async (req, res) => {
    try {
        const min = Number(req.params.min);
        const max = Number(req.params.max);
        const flights = await FlightService_1.default.getFlightsByPriceRange(min, max);
        res.json(flights);
    }
    catch {
        res.status(500).json({ error: 'Error al filtrar vuelos por precio' });
    }
};
exports.getFlightsByPriceRange = getFlightsByPriceRange;
