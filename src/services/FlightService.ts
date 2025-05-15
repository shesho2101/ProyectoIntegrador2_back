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
  const normalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  if (filters.origen && ciudades[normalize(filters.origen)]) {
    query['search_parameters.departure'] = ciudades[normalize(filters.origen)];
  }

  if (filters.destino && ciudades[normalize(filters.destino)]) {
    query['search_parameters.destination'] = ciudades[normalize(filters.destino)];
  }

  // Fecha de salida exacta
  if (filters.salida) {
    query['search_parameters.departure_date'] = filters.salida;
    // Si usas Date en Mongo, reemplaza lo anterior por esto:
    /*
    const start = new Date(filters.salida);
    const end = new Date(filters.salida);
    end.setDate(end.getDate() + 1);
    query['search_parameters.departure_date'] = {
      $gte: start.toISOString(),
      $lt: end.toISOString()
    };
    */
  }

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
  const vuelos = await FlightModel.find();
  return vuelos;
};
