import { IUser } from '../../src/models/UserModel'; // Ajusta la ruta si cambia

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
