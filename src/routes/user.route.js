import express from 'express';
import User from '../controllers/user.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import ProfileMiddleware from '../middlewares/profile.middleware';

const router = express.Router();

router.get('/', AuthMiddleware.verifyToken, AuthMiddleware.isSuperAdmin, User.getAllUsers);
router.get('/:id', ProfileMiddleware.param, AuthMiddleware.verifyToken, AuthMiddleware.isSuperAdmin, User.getUser);

export default router;
