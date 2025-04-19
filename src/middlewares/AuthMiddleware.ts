import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Tipo extendido de Request para incluir la propiedad `user`
export interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Extraer el token del encabezado

  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó token de autenticación' });
  }

  try {
    // Verificar el token y agregar la información decodificada a `req.user`
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};
