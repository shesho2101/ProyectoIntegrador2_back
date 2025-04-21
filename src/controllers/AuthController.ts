import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/AuthService';

/**
 * Controller para manejar el registro de un nuevo usuario.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene los datos del nuevo usuario (nombre, email, password, rol).
 * @param {Response} res - Objeto de respuesta HTTP utilizado para devolver el resultado de la operación.
 *
 * @returns {void} Devuelve una respuesta JSON con el token si el registro es exitoso, o un error en caso contrario.
 */
export const registerController = async (req: Request, res: Response): Promise<void> => {
  const { nombre, email, password, rol } = req.body;

  try {
    // Llamamos al servicio para registrar el usuario
    const token = await registerUser(nombre, email, password, rol);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

/**
 * Controller para manejar el login de un usuario.
 *
 * @param {Request} req - Objeto de solicitud HTTP que contiene las credenciales del usuario (email y password).
 * @param {Response} res - Objeto de respuesta HTTP utilizado para devolver el resultado de la operación.
 *
 * @returns {void} Devuelve una respuesta JSON con el token si la autenticación es exitosa, o un error en caso contrario.
 */
export const loginController = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    // Llamamos al servicio para loguear al usuario
    const token = await loginUser(email, password);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};
