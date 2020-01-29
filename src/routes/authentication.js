import express from 'express';
import passport from 'passport';
import AuthanticationController from '../controllers/authanticationController';
import AuthMiddleware from '../middlewares/auth.middleware';
import resetController from '../controllers/resetController';
import emailValidate from '../middleware/emailValidation';
import confirmController from '../controllers/confirm.email';
import emailAuth from '../middlewares/emailAuth';

require('../services/0auth');

const router = express.Router();

router.post('/login', AuthanticationController.Login);
router.post('/signup', AuthMiddleware.signup, AuthanticationController.register);
router.get('/logout', AuthanticationController.logout);
router.get('/testlogout', AuthMiddleware.verifyToken, AuthanticationController.loggedOut);
router.post('/forget', emailValidate.forget, resetController.forgetPassword);
router.post('/confirmation/:emailToken', confirmController.verifyingUsers);

router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] }));
router.get('/google/callback',
  passport.authenticate('google', { session: false }), emailAuth.googleTokenChecker, AuthanticationController.socialLogin);

router.get('/facebook',
  passport.authenticate('facebook'));
router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }), emailAuth.facebookTokenChecker, AuthanticationController.socialLogin);

export default router;
