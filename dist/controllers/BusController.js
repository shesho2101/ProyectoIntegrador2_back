"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBusesByType = exports.getBusesByDepartureTime = exports.getBusesByPriceRange = exports.getBusesByDestination = exports.getBusesByOrigin = exports.deleteBus = exports.updateBus = exports.createBus = exports.getBusById = exports.getBuses = void 0;
const BusService_1 = __importDefault(require("../services/BusService"));
// Obtener todos los buses
const getBuses = async (req, res) => {
    try {
        const buses = await BusService_1.default.getAllBuses();
        res.json({ buses });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los buses' });
    }
};
exports.getBuses = getBuses;
// Obtener un bus por ID
const getBusById = async (req, res) => {
    const { id } = req.params;
    try {
        const bus = await BusService_1.default.getBusById(id);
        const busWithOpinions = await bus.populate('opiniones');
        res.json(busWithOpinions);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el bus' });
    }
};
exports.getBusById = getBusById;
// Crear un nuevo bus
const createBus = async (req, res) => {
    try {
        const busData = req.body;
        const newBus = await BusService_1.default.createBus(busData);
        res.status(201).json({ message: 'Bus creado exitosamente', bus: newBus });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el bus' });
    }
};
exports.createBus = createBus;
// Actualizar un bus por ID
const updateBus = async (req, res) => {
    try {
        const busData = req.body;
        const bus = await BusService_1.default.updateBus(req.params.id, busData);
        res.json({ message: 'Bus actualizado', bus });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar el bus' });
    }
};
exports.updateBus = updateBus;
// Eliminar un bus por ID
const deleteBus = async (req, res) => {
    try {
        const result = await BusService_1.default.deleteBus(req.params.id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el bus' });
    }
};
exports.deleteBus = deleteBus;
// Filtrar buses por origen
const getBusesByOrigin = async (req, res) => {
    try {
        const { origen } = req.params;
        const buses = await BusService_1.default.getBusesByOrigin(origen);
        res.json(buses);
    }
    catch (err) {
        res.status(500).json({ error: 'Error al filtrar buses por origen' });
    }
};
exports.getBusesByOrigin = getBusesByOrigin;
// Filtrar buses por destino
const getBusesByDestination = async (req, res) => {
    try {
        const { destino } = req.params;
        const buses = await BusService_1.default.getBusesByDestination(destino);
        res.json(buses);
    }
    catch (err) {
        res.status(500).json({ error: 'Error al filtrar buses por destino' });
    }
};
exports.getBusesByDestination = getBusesByDestination;
// Filtrar buses por rango de precio
const getBusesByPriceRange = async (req, res) => {
    try {
        const min = Number(req.params.min);
        const max = Number(req.params.max);
        const buses = await BusService_1.default.getBusesByPrice(min, max);
        res.json(buses);
    }
    catch (err) {
        res.status(500).json({ error: 'Error al filtrar buses por precio' });
    }
};
exports.getBusesByPriceRange = getBusesByPriceRange;
// Filtrar buses por fecha de salida
const getBusesByDepartureTime = async (req, res) => {
    try {
        const fecha = new Date(req.params.fecha);
        const buses = await BusService_1.default.getBusesByDepartureTime(fecha);
        res.json(buses);
    }
    catch (err) {
        res.status(500).json({ error: 'Error al filtrar buses por fecha de salida' });
    }
};
exports.getBusesByDepartureTime = getBusesByDepartureTime;
// Filtrar buses por tipo
const getBusesByType = async (req, res) => {
    try {
        const { tipo } = req.params;
        const buses = await BusService_1.default.getBusesByType(tipo);
        res.json(buses);
    }
    catch (err) {
        res.status(500).json({ error: 'Error al filtrar buses por tipo' });
    }
};
exports.getBusesByType = getBusesByType;
