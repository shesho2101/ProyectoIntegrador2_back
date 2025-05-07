"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan"));
const MongoProvider_1 = __importDefault(require("./config/MongoProvider"));
const ErrorMiddleware_1 = require("./middlewares/ErrorMiddleware");
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const BusRoutes_1 = __importDefault(require("./routes/BusRoutes"));
const HotelRoutes_1 = __importDefault(require("./routes/HotelRoutes"));
const FlightRoutes_1 = __importDefault(require("./routes/FlightRoutes"));
const FavoriteRoutes_1 = __importDefault(require("./routes/FavoriteRoutes"));
const OpinionRoutes_1 = __importDefault(require("./routes/OpinionRoutes"));
const CartRoutes_1 = __importDefault(require("./routes/CartRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        'http://localhost:5173',
        'https://wayra.up.railway.app'
    ],
    credentials: true
}));
app.use((0, morgan_1.default)('dev'));
// Conexión a la base de datos
(0, MongoProvider_1.default)();
// Rutas
app.use('/api/auth', AuthRoutes_1.default);
app.use('/api/buses', BusRoutes_1.default);
app.use('/api/hotels', HotelRoutes_1.default);
app.use('/api/flights', FlightRoutes_1.default);
app.use('/api/favorites', FavoriteRoutes_1.default);
app.use('/api/opinions', OpinionRoutes_1.default);
app.use('/api/cart', CartRoutes_1.default);
// Middleware de manejo de errores
app.use(ErrorMiddleware_1.errorHandler);
exports.default = app;
