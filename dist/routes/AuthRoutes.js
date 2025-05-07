"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = require("../controllers/AuthController");
const express_validator_1 = require("express-validator");
const ValidateFields_1 = require("../middlewares/ValidateFields");
const router = (0, express_1.Router)();
// Ruta para registrar un usuario
router.post('/register', [
    (0, express_validator_1.body)('nombre').notEmpty().withMessage('El nombre es requerido'),
    (0, express_validator_1.body)('email').isEmail().withMessage('Debe ser un email válido'),
    (0, express_validator_1.body)('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], ValidateFields_1.validateFields, AuthController_1.registerController);
// Ruta para login de un usuario
router.post('/login', [
    (0, express_validator_1.body)('email').isEmail().withMessage('Debe ser un email válido'),
    (0, express_validator_1.body)('password').notEmpty().withMessage('La contraseña es obligatoria')
], ValidateFields_1.validateFields, AuthController_1.loginController);
exports.default = router;
