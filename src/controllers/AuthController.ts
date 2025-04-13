// AuthController.ts - Controlador de autenticación
import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../services/AuthService';

export const registerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json({ message: 'Usuario registrado', user });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = await loginUser(req.body.email, req.body.password);
    res.status(200).json({ message: 'Autenticado correctamente', token });
  } catch (error) {
    next(error);
  }
};
