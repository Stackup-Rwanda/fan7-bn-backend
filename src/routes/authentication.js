import express from 'express';
import AuthanticationController from '../controllers/authanticationController';
import AuthMiddleware from '../middlewares/auth.middlewares';

const router = express.Router();

router.post('/login', AuthanticationController.Login);
router.post('/signup', AuthMiddleware.signup, AuthanticationController.register);


export default router;
