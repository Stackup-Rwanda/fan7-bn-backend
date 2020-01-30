import express from 'express';
import AuthanticationController from '../controllers/authanticationController';
import AuthMiddleware from '../middlewares/auth.middleware';


const router = express.Router();
router.post('/signup', AuthMiddleware.signup, AuthanticationController.register);
router.get('/logout', AuthanticationController.logout);
router.get('/testlogout', AuthMiddleware.verifyToken, AuthanticationController.loggedOut);

export default router;
