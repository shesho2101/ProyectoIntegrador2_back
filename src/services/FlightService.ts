// ✅ services/FlightService.ts
import FlightModel from '../models/FlightModel';

// Mapeo de nombres de ciudades a códigos IATA
const ciudades: Record<string, string> = {
  Bucaramanga: "BGA",
  Medellin: "MDE",
  Bogota: "BOG",
  Cartagena: "CTG",
  Barranquilla: "BAQ",
  Cali: "CLO",
  Pereira: "PEI",
};

export const getFilteredFlightsService = async (filters: any, page: number, limit: number) => {
  const query: any = {};

  // Tipo de vuelo
  if (filters.tipoVuelo === 'ida') {
    query['search_parameters.return_date'] = null;
  } else if (filters.tipoVuelo === 'ida-vuelta') {
    query['search_parameters.return_date'] = { $ne: null };
  }

  // Origen y destino con mapeo a códigos IATA
  if (filters.origen && ciudades[filters.origen]) {
    query['search_parameters.departure'] = ciudades[filters.origen];
  }

  if (filters.destino && ciudades[filters.destino]) {
    query['search_parameters.destination'] = ciudades[filters.destino];
  }

  // Fecha de salida
  if (filters.salida) {
    query['search_parameters.departure_date'] = filters.salida;
  }

  console.log('Query enviada a MongoDB:', query);

  const skip = (page - 1) * limit;
  const vuelos = await FlightModel.find(query).skip(skip).limit(limit);
  const total = await FlightModel.countDocuments(query);

  return {
    resultados: vuelos,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
};

export const getAllFlightsService = async () => {
  const vuelos = await FlightModel.find(); // trae todos
  return vuelos;
};
