import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel';  // Asegúrate de que el modelo esté importado correctamente
import { IUser } from '../models/UserModel';  // Importa la interfaz IUser

const saltRounds = 10;

export const registerUser = async (user: IUser): Promise<IUser> => {
  // Asegúrate de que la contraseña esté definida
  if (!user.password) {
    throw new Error('La contraseña no puede ser vacía');
  }

  // Generar el hash de la contraseña
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);  // Ahora password no es undefined

  // Usamos Sequelize para crear el usuario
  const newUser = await User.create({
    nombre: user.nombre,
    email: user.email,
    password_hash: hashedPassword,  // Se guarda el hash, no la contraseña en texto claro
  });

  return newUser;  // Retorna el nuevo usuario creado
};

// Autenticar un usuario
export const loginUser = async (email: string, password: string): Promise<string> => {
  // Usamos Sequelize para buscar el usuario
  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error('Usuario no encontrado');
  }

  // Comparar la contraseña en texto plano con el hash
  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) {
    throw new Error('Credenciales inválidas');
  }

  // Generar un JWT si la autenticación es exitosa
  const token = jwt.sign(
    { id: user.id, email: user.email },
    process.env.TOKEN_SECRET as string,
    { expiresIn: '1h' }
  );

  return token;
};
