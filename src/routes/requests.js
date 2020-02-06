import express from 'express';
import AuthMiddleware from '../middlewares/auth.middleware';
import requestController from '../controllers/requestController';
import requestValidation from '../middlewares/requestValidation';
import tripValues from '../middlewares/tripValues';

const router = express.Router();

router.post(
  '/one_way',
  AuthMiddleware.verifyToken,
  AuthMiddleware.autoFill,
  requestValidation.oneway,
  tripValues.locationExist,
  tripValues.accommodationExist,
  requestController.create,
  AuthMiddleware.rememberMe
);


router.post(
  '/return_trip',
  AuthMiddleware.verifyToken,
  AuthMiddleware.autoFill,
  requestValidation.oneway,
  requestValidation.returnTrip,
  tripValues.locationExist,
  tripValues.accommodationExist,
  requestController.create,
  AuthMiddleware.rememberMe
);


export default router;
