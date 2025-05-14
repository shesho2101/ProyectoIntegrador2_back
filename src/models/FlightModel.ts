import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
  search_parameters: {
    departure: String,
    destination: String,
    departure_date: String,
    return_date: String,
    search_timestamp: String,
  },
  flights: [mongoose.Schema.Types.Mixed],
});

// 👇 Asegúrate de pasar explícitamente el nombre 'flights' como tercer argumento
const FlightModel = mongoose.model('FlightSearch', flightSchema, 'flights');

export default FlightModel;
