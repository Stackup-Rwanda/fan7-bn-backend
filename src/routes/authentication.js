import express from 'express';
import passport from 'passport';
import AuthanticationController from '../controllers/authanticationController';
import AuthMiddleware from '../middlewares/auth.middlewares';
import emailAuth from '../middlewares/emailAuth';

require('../services/0auth');

const router = express.Router();
router.post('/signup', AuthMiddleware.signup, AuthanticationController.register);

router.get('/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email'] }));
router.get('/google/callback',
  passport.authenticate('google', { session: false }), emailAuth.googleTokenChecker, AuthanticationController.socialLogin);

router.get('/facebook',
  passport.authenticate('facebook'));
router.get('/facebook/callback',
  passport.authenticate('facebook', { session: false }), emailAuth.facebookTokenChecker, AuthanticationController.socialLogin);

export default router;
