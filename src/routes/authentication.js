import express from 'express';
import AuthanticationController from '../controllers/authanticationController';
import AuthMiddleware from '../middlewares/auth.middleware';
import resetController from '../controllers/resetController';
import emailValidate from '../middleware/emailValidation';

import authentiactionJWT from '../middlewares/authenticationJWT';

import authentiactionJWT from '../middlewares/authenticationJWT';

const router = express.Router();

router.post('/login', AuthanticationController.Login);
router.post('/signup', AuthMiddleware.signup, AuthanticationController.register);
<<<<<<< HEAD
router.get('/logout', AuthanticationController.logout);
router.get('/testlogout', AuthMiddleware.verifyToken, AuthanticationController.loggedOut);
router.post('/forget', emailValidate.forget, resetController.forgetPassword);
=======
>>>>>>> ft(server): assign role
router.patch('/assignRole', authentiactionJWT, AuthMiddleware.userRole, AuthanticationController.assignRole);

export default router;
