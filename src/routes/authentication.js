import express from 'express';
import AuthanticationController from '../controllers/authanticationController';
import AuthMiddleware from '../middlewares/auth.middleware';
import resetController from '../controllers/resetController';
import confirmController from '../controllers/confirm.email';
import emailValidate from '../middlewares/emailValidation';

const router = express.Router();

router.post('/login', AuthanticationController.Login);
router.post('/signup', AuthMiddleware.signup, AuthanticationController.register);
router.get('/logout', AuthanticationController.logout);
router.get('/testlogout', AuthMiddleware.verifyToken, AuthanticationController.loggedOut);
router.post('/forget', emailValidate.forget, resetController.forgetPassword);
router.post('/confirmation/:emailToken', confirmController.verifyingUsers);
router.patch('/reset/:email/:password', emailValidate.reset, resetController.resetPassword);

export default router;
