"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/models/FavoriteModel.ts
const sequelize_1 = require("sequelize");
const MySQLProvider_1 = __importDefault(require("../config/MySQLProvider"));
class Favorite extends sequelize_1.Model {
}
Favorite.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    usuario_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    tipo_favorito: {
        type: sequelize_1.DataTypes.ENUM('hotel', 'vuelo', 'bus'),
        allowNull: false,
    },
    referencia_mongo_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: MySQLProvider_1.default,
    modelName: 'Favorite',
    tableName: 'favoritos',
    timestamps: false,
});
exports.default = Favorite;
