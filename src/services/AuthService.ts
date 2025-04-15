import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';  

// Registrar un nuevo usuario
export const registerUser = async (nombre: string, email: string, password: string) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // Hash de la contraseña
    const user = await User.create({ nombre, email, password_hash: hashedPassword });

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET as string, { expiresIn: '1h' });

    return token;
  } catch (error) {
    throw new Error('Error al registrar el usuario');
  }
};

// Login de usuario
export const loginUser = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      throw new Error('Contraseña incorrecta');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.TOKEN_SECRET as string, { expiresIn: '1h' });

    return token;
  } catch (error) {
    throw new Error('Error al autenticar el usuario');
  }
};
