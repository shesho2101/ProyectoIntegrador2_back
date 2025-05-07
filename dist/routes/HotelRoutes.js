"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const HotelController_1 = require("../controllers/HotelController");
const AuthMiddleware_1 = require("../middlewares/AuthMiddleware");
const VerifyAdminMiddleware_1 = require("../middlewares/VerifyAdminMiddleware");
const router = (0, express_1.Router)();
// Público: obtener todos los hoteles
router.get('/', HotelController_1.getAllHotels);
// Público: obtener un hotel por ID
router.get('/:id', HotelController_1.getHotelById);
// Admin: crear, actualizar y borrar hoteles
router.post('/', AuthMiddleware_1.verifyToken, VerifyAdminMiddleware_1.verifyAdmin, HotelController_1.createHotel);
router.put('/:id', AuthMiddleware_1.verifyToken, VerifyAdminMiddleware_1.verifyAdmin, HotelController_1.updateHotel);
router.delete('/:id', AuthMiddleware_1.verifyToken, VerifyAdminMiddleware_1.verifyAdmin, HotelController_1.deleteHotel);
// Público: filtrar hoteles por ciudad
router.get('/city/:ciudad', HotelController_1.getHotelsByCity);
// Público: filtrar hoteles por rango de precio
router.get('/price/:min/:max', HotelController_1.getHotelsByPriceRange);
router.get('/ciudades/unicas', HotelController_1.getUniqueCities);
exports.default = router;
