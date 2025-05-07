"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const OpinionController_1 = require("../controllers/OpinionController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const VerifyAdminMiddleware_1 = require("../middlewares/VerifyAdminMiddleware");
const router = (0, express_1.Router)();
// Crear opinión (Solo usuarios logueados)
router.post('/', AuthMiddleware_1.verifyToken, OpinionController_1.createOpinion);
// Obtener todas las opiniones (Todos los usuarios)
router.get('/', OpinionController_1.getAllOpinions);
// Eliminar una opinión por ID (Solo Admin)
router.delete('/:id', AuthMiddleware_1.verifyToken, VerifyAdminMiddleware_1.verifyAdmin, OpinionController_1.deleteOpinion);
// Obtener una opinión por ID
router.get('/:id', OpinionController_1.getOpinionById);
exports.default = router;
