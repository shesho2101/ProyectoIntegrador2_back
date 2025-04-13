import { Router } from 'express';
import { registerController, loginController } from '../controllers/AuthController';
import { body } from 'express-validator';
import { validateFields } from '../middlewares/ValidateFields';

const router = Router();

router.post(
  '/register',
  [
    body('nombre').notEmpty().withMessage('El nombre es requerido'),
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
  ],
  validateFields,
  registerController
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Debe ser un email válido'),
    body('password').notEmpty().withMessage('La contraseña es obligatoria')
  ],
  validateFields,
  loginController
);

export default router;
