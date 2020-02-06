import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import requestController from '../controllers/requestController';

const router = express.Router();

router.post('/one_way', AuthMiddleware.verifyToken, AuthMiddleware.autoFill, requestController.oneWay, AuthMiddleware.rememberMe);

export default router;
