"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOpinion = exports.getOpinionById = exports.getAllOpinions = exports.createOpinion = void 0;
const OpinionModel_1 = __importDefault(require("../models/OpinionModel"));
const HotelModel_1 = __importDefault(require("../models/HotelModel"));
const BusModel_1 = __importDefault(require("../models/BusModel"));
const FlightModel_1 = __importDefault(require("../models/FlightModel"));
// Crear una nueva opinión
const createOpinion = async (opinionData) => {
    try {
        const newOpinion = new OpinionModel_1.default(opinionData);
        await newOpinion.save();
        let entity;
        if (opinionData.tipo_opinion === 'hotel') {
            entity = await HotelModel_1.default.findById(opinionData.referencia_mongo_id);
        }
        else if (opinionData.tipo_opinion === 'bus') {
            entity = await BusModel_1.default.findById(opinionData.referencia_mongo_id);
        }
        else if (opinionData.tipo_opinion === 'vuelo') {
            entity = await FlightModel_1.default.findById(opinionData.referencia_mongo_id);
        }
        if (entity) {
            entity.opiniones.push(newOpinion._id);
            await entity.save();
        }
        return newOpinion;
    }
    catch (error) {
        throw new Error(`Error al crear la opinión`);
    }
};
exports.createOpinion = createOpinion;
// Obtener todas las opiniones
const getAllOpinions = async () => {
    try {
        const opinions = await OpinionModel_1.default.find();
        return opinions;
    }
    catch (error) {
        throw new Error(`Error al obtener las opiniones`);
    }
};
exports.getAllOpinions = getAllOpinions;
// Obtener una opinión por ID
const getOpinionById = async (id) => {
    try {
        const opinion = await OpinionModel_1.default.findById(id);
        if (!opinion) {
            throw new Error('Opinión no encontrada');
        }
        return opinion;
    }
    catch (error) {
        throw new Error(`Error al obtener la opinión`);
    }
};
exports.getOpinionById = getOpinionById;
// Eliminar una opinión por ID
const deleteOpinion = async (id) => {
    try {
        const opinion = await OpinionModel_1.default.findByIdAndDelete(id);
        if (!opinion) {
            throw new Error('Opinión no encontrada');
        }
        return opinion;
    }
    catch (error) {
        throw new Error(`Error al eliminar la opinión`);
    }
};
exports.deleteOpinion = deleteOpinion;
