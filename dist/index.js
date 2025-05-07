"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// index.ts - Inicio del servidor
const app_1 = __importDefault(require("./app"));
const MongoProvider_1 = __importDefault(require("./config/MongoProvider"));
const PORT = process.env.PORT || 3002;
const startServer = async () => {
    await (0, MongoProvider_1.default)();
    app_1.default.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
    // Manejo de errores del servidor
    app_1.default.on('error', (err) => {
        console.error('Error al iniciar el servidor:', err);
    });
};
startServer();
