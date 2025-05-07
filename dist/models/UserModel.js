"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const MySQLProvider_1 = __importDefault(require("../config/MySQLProvider"));
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    nombre: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password_hash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    fecha_registro: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW,
    },
    rol: {
        type: sequelize_1.DataTypes.ENUM('usuario', 'admin'),
        defaultValue: 'usuario',
        allowNull: false,
    },
}, {
    sequelize: MySQLProvider_1.default,
    modelName: 'User',
    tableName: 'usuarios',
    timestamps: false,
});
exports.default = User;
