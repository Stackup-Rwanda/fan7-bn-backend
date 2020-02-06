import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import requestController from '../controllers/requestController';
import requestValidation from '../middlewares/requestValidation';
import tripValues from '../middlewares/tripValues';

const router = express.Router();

router.post('/one_way', AuthMiddleware.verifyToken, AuthMiddleware.autoFill, requestValidation.oneway,
  tripValues.locationExist,
  tripValues.accommodationExist, requestController.oneWay, AuthMiddleware.rememberMe);

export default router;
