"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Configura la conexión de Sequelize
const sequelize = new sequelize_1.Sequelize(process.env.MYSQL_DATABASE || 'railway', process.env.MYSQL_USER || 'root', process.env.MYSQL_PASSWORD || 'jplJVrJiajSPNOyglrwpVDzNYfudYlOg', {
    host: process.env.MYSQL_HOST || 'interchange.proxy.rlwy.net',
    port: Number(process.env.MYSQL_PORT) || 23068,
    dialect: 'mysql',
    logging: false,
});
// Verificar la conexión
sequelize.authenticate()
    .then(() => {
    console.log('Conexión establecida correctamente');
})
    .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
});
exports.default = sequelize;
