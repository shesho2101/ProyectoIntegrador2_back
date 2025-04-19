import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/AuthService';  // Aquí estamos llamando al servicio

// Registro de un nuevo usuario
export const registerController = async (req: Request, res: Response) => {
  const { nombre, email, password, rol } = req.body;

  try {
    // Llamamos al servicio para registrar el usuario
    const token = await registerUser(nombre, email, password, rol);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

// Login de un usuario
export const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Llamamos al servicio para loguear al usuario
    const token = await loginUser(email, password);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
