"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const FlightController_1 = require("../controllers/FlightController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const VerifyAdminMiddleware_1 = require("../middlewares/VerifyAdminMiddleware");
const router = (0, express_1.Router)();
// Público: todos los vuelos
router.get('/', FlightController_1.getFlights);
// Público: un vuelo por ID
router.get('/:id', FlightController_1.getFlightById);
// Solo Admin: crear, actualizar y borrar
router.post('/', AuthMiddleware_1.verifyToken, VerifyAdminMiddleware_1.verifyAdmin, FlightController_1.createFlight);
router.put('/:id', AuthMiddleware_1.verifyToken, VerifyAdminMiddleware_1.verifyAdmin, FlightController_1.updateFlight);
router.delete('/:id', AuthMiddleware_1.verifyToken, VerifyAdminMiddleware_1.verifyAdmin, FlightController_1.deleteFlight);
// Filtros públicos por parámetro en la URL
router.get('/origin/:origen', FlightController_1.getFlightsByOrigin);
router.get('/destination/:destino', FlightController_1.getFlightsByDestination);
router.get('/price/:min/:max', FlightController_1.getFlightsByPriceRange);
exports.default = router;
