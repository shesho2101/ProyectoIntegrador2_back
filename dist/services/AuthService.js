"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const UserModel_1 = __importDefault(require("../models/UserModel"));
// Registrar un nuevo usuario
const registerUser = async (nombre, email, password, rol = 'usuario') => {
    try {
        const hashedPassword = await bcryptjs_1.default.hash(password, 10); // Hash de la contraseña
        const user = await UserModel_1.default.create({ nombre, email, password_hash: hashedPassword, rol });
        // Generamos el token JWT con el rol
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, rol: user.rol }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        return token;
    }
    catch (error) {
        throw new Error('Error al registrar el usuario');
    }
};
exports.registerUser = registerUser;
// Login de usuario
const loginUser = async (email, password) => {
    try {
        const user = await UserModel_1.default.findOne({ where: { email } });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error('Contraseña incorrecta');
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email, rol: user.rol }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        return token;
    }
    catch (error) {
        throw new Error('Error al autenticar el usuario');
    }
};
exports.loginUser = loginUser;
