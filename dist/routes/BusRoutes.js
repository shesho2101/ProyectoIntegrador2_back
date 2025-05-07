"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BusController_1 = require("../controllers/BusController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const VerifyAdminMiddleware_1 = require("../middlewares/VerifyAdminMiddleware");
const router = (0, express_1.Router)();
// Obtener todos los buses
router.get('/', BusController_1.getBuses);
// Obtener un bus por ID
router.get('/:id', BusController_1.getBusById);
// Crear un nuevo bus (Solo Admin)
router.post('/', AuthMiddleware_1.verifyToken, VerifyAdminMiddleware_1.verifyAdmin, BusController_1.createBus);
// Actualizar un bus por ID (Solo Admin)
router.put('/:id', AuthMiddleware_1.verifyToken, VerifyAdminMiddleware_1.verifyAdmin, BusController_1.updateBus);
// Eliminar un bus por ID (Solo Admin)
router.delete('/:id', AuthMiddleware_1.verifyToken, VerifyAdminMiddleware_1.verifyAdmin, BusController_1.deleteBus);
// Filtrar buses por origen
router.get('/origin/:origen', BusController_1.getBusesByOrigin);
// Filtrar buses por destino
router.get('/destination/:destino', BusController_1.getBusesByDestination);
// Filtrar buses por rango de precio
router.get('/price/:min/:max', BusController_1.getBusesByPriceRange);
// Filtrar buses por fecha de salida
router.get('/departure-time/:fecha', BusController_1.getBusesByDepartureTime);
// Filtrar buses por tipo
router.get('/type/:tipo', BusController_1.getBusesByType);
exports.default = router;
