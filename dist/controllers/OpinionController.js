"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOpinionById = exports.deleteOpinion = exports.getAllOpinions = exports.createOpinion = void 0;
const OpinionService = __importStar(require("../services/OpinionService"));
const OpinionModel_1 = __importDefault(require("../models/OpinionModel"));
const HotelModel_1 = __importDefault(require("../models/HotelModel"));
const FlightModel_1 = __importDefault(require("../models/FlightModel"));
const BusModel_1 = __importDefault(require("../models/BusModel"));
// Crear una nueva opinión
const createOpinion = async (req, res) => {
    const { usuario_id, tipo_opinion, referencia_mongo_id, calificacion, comentario } = req.body;
    try {
        if (!usuario_id || !tipo_opinion || !referencia_mongo_id || !calificacion) {
            return res.status(400).json({ error: 'Faltan datos requeridos' });
        }
        if (calificacion < 1 || calificacion > 5) {
            return res.status(400).json({ error: 'La calificación debe estar entre 1 y 5' });
        }
        const newOpinion = new OpinionModel_1.default({
            usuario_id,
            tipo_opinion,
            referencia_mongo_id,
            calificacion,
            comentario,
        });
        await newOpinion.save();
        if (tipo_opinion === 'hotel') {
            const hotel = await HotelModel_1.default.findById(referencia_mongo_id);
            if (!hotel) {
                return res.status(404).json({ error: 'Hotel no encontrado' });
            }
            hotel.opiniones.push(newOpinion);
            await hotel.save();
        }
        else if (tipo_opinion === 'vuelo') {
            const vuelo = await FlightModel_1.default.findById(referencia_mongo_id);
            if (!vuelo) {
                return res.status(404).json({ error: 'Vuelo no encontrado' });
            }
            vuelo.opiniones.push(newOpinion);
            await vuelo.save();
        }
        else if (tipo_opinion === 'bus') {
            const bus = await BusModel_1.default.findById(referencia_mongo_id);
            if (!bus) {
                return res.status(404).json({ error: 'Bus no encontrado' });
            }
            bus.opiniones.push(newOpinion);
            await bus.save();
        }
        res.status(201).json(newOpinion);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: `Error al crear la opinión` });
    }
};
exports.createOpinion = createOpinion;
// Obtener todas las opiniones
const getAllOpinions = async (req, res) => {
    try {
        const opinions = await OpinionService.getAllOpinions();
        res.json(opinions);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener las opiniones' });
    }
};
exports.getAllOpinions = getAllOpinions;
// Eliminar una opinión por ID (solo un admin)
const deleteOpinion = async (req, res) => {
    const { id } = req.params;
    try {
        // Asegúrate de verificar si el usuario es un admin antes de eliminar
        const opinion = await OpinionService.deleteOpinion(id);
        res.json({ message: 'Opinión eliminada', opinion });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar la opinión' });
    }
};
exports.deleteOpinion = deleteOpinion;
// Obtener una opinión por ID
const getOpinionById = async (req, res) => {
    const { id } = req.params;
    try {
        const opinion = await OpinionService.getOpinionById(id);
        if (!opinion) {
            return res.status(404).json({ message: 'Opinión no encontrada' });
        }
        res.json(opinion);
    }
    catch (error) {
        res.status(500).json({ error: `Error al obtener la opinión` });
    }
};
exports.getOpinionById = getOpinionById;
