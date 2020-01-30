import express from 'express';
import AuthanticationController from '../controllers/authanticationController';
import AuthMiddleware from '../middlewares/auth.middleware';
import resetController from '../controllers/resetController';
import emailValidate from '../middleware/emailValidation';
import confirmController from '../controllers/confirm.email';

const router = express.Router();

router.post('/login', AuthanticationController.Login);
router.post('/signup', AuthMiddleware.signup, AuthanticationController.register);
router.get('/logout', AuthanticationController.logout);
router.get('/testlogout', AuthMiddleware.verifyToken, AuthanticationController.loggedOut);
router.post('/forget', emailValidate.forget, resetController.forgetPassword);
router.post('/confirmation/:emailToken', confirmController.verifyingUsers);

export default router;
