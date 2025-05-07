"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = void 0;
const verifyUser = (req, res, next) => {
    const userId = req.user?.id; // El id del usuario desde el token
    const paramId = parseInt(req.params.usuario_id); // El id del usuario en la URL
    if (userId !== paramId) {
        return res.status(403).json({ message: 'Acceso denegado: Solo puedes acceder a tus propios datos' });
    }
    next();
};
exports.verifyUser = verifyUser;
