import { Request, Response, NextFunction } from 'express';

// Tipo extendido de Request para incluir la propiedad `user`
export interface AuthRequest extends Request {
  user?: any;
}

export const verifyUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.id;  // El id del usuario desde el token
  const paramId = parseInt(req.params.usuario_id);  // El id del usuario en la URL

  if (userId !== paramId) {
    return res.status(403).json({ message: 'Acceso denegado: Solo puedes acceder a tus propios datos' });
  }

  next();
};
