import express from 'express';
import AuthanticationController from '../controllers/authanticationController';
import AuthMiddleware from '../middlewares/auth.middlewares';

import authentiactionJWT from '../middlewares/authenticationJWT';

const router = express.Router();
router.post('/signup', AuthMiddleware.signup, AuthanticationController.register);
router.patch('/assignRole', authentiactionJWT, AuthMiddleware.userRole, AuthanticationController.assignRole);

export default router;
