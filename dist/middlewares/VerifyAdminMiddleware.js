"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAdmin = void 0;
const verifyAdmin = (req, res, next) => {
    const user = req.user;
    if (user && user.rol === 'admin') {
        return next();
    }
    else {
        return res.status(403).json({ message: 'Acceso denegado, se requiere rol de administrador' });
    }
};
exports.verifyAdmin = verifyAdmin;
