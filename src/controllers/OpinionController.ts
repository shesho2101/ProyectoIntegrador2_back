// src/controllers/OpinionController.ts
import { Request, Response } from 'express';
import * as OpinionService from '../services/OpinionService';
import Opinion from '../models/OpinionModel';
import Hotel from '../models/HotelModel';
import Flight from '../models/FlightModel';
import Bus from '../models/BusModel';

// Crear una nueva opinión
export const createOpinion = async (req: Request, res: Response) => {
  const { usuario_id, tipo_opinion, referencia_mongo_id, calificacion, comentario } = req.body;
  try {
    if (!usuario_id || !tipo_opinion || !referencia_mongo_id || !calificacion) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    // Validar que la calificación esté entre 1 y 5
    if (calificacion < 1 || calificacion > 5) {
      return res.status(400).json({ error: 'La calificación debe estar entre 1 y 5' });
    }

    // Crear la opinión
    const newOpinion = new Opinion({
      usuario_id,
      tipo_opinion,
      referencia_mongo_id,
      calificacion,
      comentario,
    });

    await newOpinion.save();  // Guardar la opinión

    // Actualizar el producto (hotel/vuelo/bus) con la nueva opinión
    if (tipo_opinion === 'hotel') {
      const hotel = await Hotel.findById(referencia_mongo_id);
      if (!hotel) {
        return res.status(404).json({ error: 'Hotel no encontrado' });
      }
      hotel.opiniones.push(newOpinion);
      await hotel.save();
    } else if (tipo_opinion === 'vuelo') {
      const vuelo = await Flight.findById(referencia_mongo_id);
      if (!vuelo) {
        return res.status(404).json({ error: 'Vuelo no encontrado' });
      }
      vuelo.opiniones.push(newOpinion);
      await vuelo.save();
    } else if (tipo_opinion === 'bus') {
      const bus = await Bus.findById(referencia_mongo_id);
      if (!bus) {
        return res.status(404).json({ error: 'Bus no encontrado' });
      }
      bus.opiniones.push(newOpinion);
      await bus.save();
    }


    res.status(201).json(newOpinion);
  } catch (error) {
    // Agregar más detalles de la excepción para depuración
    console.error(error);  // Mostrar el error completo en la consola
    res.status(500).json({ error: `Error al crear la opinión` });
  }
};


// Obtener todas las opiniones
export const getAllOpinions = async (req: Request, res: Response) => {
  try {
    const opinions = await OpinionService.getAllOpinions();
    res.json(opinions);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las opiniones' });
  }
};

// Eliminar una opinión por ID (solo un admin)
export const deleteOpinion = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    // Asegúrate de verificar si el usuario es un admin antes de eliminar
    const opinion = await OpinionService.deleteOpinion(id);
    res.json({ message: 'Opinión eliminada', opinion });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la opinión' });
  }
};

// Obtener una opinión por ID
export const getOpinionById = async (req: Request, res: Response) => {
  const { id } = req.params; // Obtener el ID de la URL
  try {
    const opinion = await OpinionService.getOpinionById(id); // Llamar al servicio para obtener la opinión por ID
    if (!opinion) {
      return res.status(404).json({ message: 'Opinión no encontrada' }); // Si no se encuentra la opinión, enviar un error 404
    }
    res.json(opinion); // Enviar la opinión en la respuesta
  } catch (error) {
    res.status(500).json({ error: `Error al obtener la opinión` }); // Si hay un error, enviar un error 500
  }
};