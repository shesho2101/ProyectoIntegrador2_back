"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.registerController = void 0;
const AuthService_1 = require("../services/AuthService"); // Aquí estamos llamando al servicio
// Registro de un nuevo usuario
const registerController = async (req, res) => {
    const { nombre, email, password, rol } = req.body;
    try {
        // Llamamos al servicio para registrar el usuario
        const token = await (0, AuthService_1.registerUser)(nombre, email, password, rol);
        res.status(201).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al registrar el usuario' });
    }
};
exports.registerController = registerController;
// Login de un usuario
const loginController = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Llamamos al servicio para loguear al usuario
        const token = await (0, AuthService_1.loginUser)(email, password);
        res.status(200).json({ token });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al iniciar sesión' });
    }
};
exports.loginController = loginController;
