import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
    user?: any;
}  

export const verifyAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.user;  
    if (user && user.rol === 'admin') {
      return next();
    } else {
      return res.status(403).json({ message: 'Acceso denegado, se requiere rol de administrador' });
    }
  };
  
