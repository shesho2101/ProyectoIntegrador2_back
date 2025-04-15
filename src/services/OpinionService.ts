import Opinion from '../models/OpinionModel';
import Hotel from '../models/HotelModel';
import Bus from '../models/BusModel';
import Flight from '../models/FlightModel';

// Crear una nueva opinión
export const createOpinion = async (opinionData: any) => {
  try {
    const newOpinion = new Opinion(opinionData);
    await newOpinion.save();

    let entity;
    if (opinionData.tipo_opinion === 'hotel') {
      entity = await Hotel.findById(opinionData.referencia_mongo_id);
    } else if (opinionData.tipo_opinion === 'bus') {
      entity = await Bus.findById(opinionData.referencia_mongo_id);
    } else if (opinionData.tipo_opinion === 'vuelo') {
      entity = await Flight.findById(opinionData.referencia_mongo_id);
    }

    if (entity) {
      entity.opiniones.push(newOpinion._id);
      await entity.save();
    }

    return newOpinion;
  } catch (error) {
    throw new Error(`Error al crear la opinión`);
  }
};

// Obtener todas las opiniones
export const getAllOpinions = async () => {
  try {
    const opinions = await Opinion.find();
    return opinions;
  } catch (error) {
    throw new Error(`Error al obtener las opiniones`);
  }
};

// Obtener una opinión por ID
export const getOpinionById = async (id: string) => {
  try {
    const opinion = await Opinion.findById(id);
    if (!opinion) {
      throw new Error('Opinión no encontrada');
    }
    return opinion;
  } catch (error) {
    throw new Error(`Error al obtener la opinión`);
  }
};

// Eliminar una opinión por ID
export const deleteOpinion = async (id: string) => {
  try {
    const opinion = await Opinion.findByIdAndDelete(id);
    if (!opinion) {
      throw new Error('Opinión no encontrada');
    }
    return opinion;
  } catch (error) {
    throw new Error(`Error al eliminar la opinión`);
  }
};
