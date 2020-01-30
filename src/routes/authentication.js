import express from 'express';
import AuthanticationController from '../controllers/authanticationController';
import AuthMiddleware from '../middlewares/auth.middleware';


import authentiactionJWT from '../middlewares/authenticationJWT';

const router = express.Router();

router.post('/login', AuthanticationController.Login);
router.post('/signup', AuthMiddleware.signup, AuthanticationController.register);
router.get('/logout', AuthanticationController.logout);
router.get('/testlogout', AuthMiddleware.verifyToken, AuthanticationController.loggedOut);
router.patch('/assignRole', authentiactionJWT, AuthMiddleware.userRole, AuthanticationController.assignRole);


export default router;
