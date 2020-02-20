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
  tripValues.validOrigin,
  tripValues.areValidDates,
  tripValues.locationExist,
  requestController.create,
  AuthMiddleware.rememberMe
);
router.get('/search', AuthMiddleware.verifyToken, requestController.search);
router.post(
  '/return_trip',
  AuthMiddleware.verifyToken,
  AuthMiddleware.autoFill,
  requestValidation.oneway,
  requestValidation.returnTrip,
  tripValues.validOrigin,
  tripValues.areValidDates,
  tripValues.locationExist,
  requestController.create,
  AuthMiddleware.rememberMe
);


router.post(
  '/multi_city',
  AuthMiddleware.verifyToken,
  AuthMiddleware.autoFill,
  requestValidation.multiCity,
  tripValues.validOrigin,
  tripValues.areValidDates,
  tripValues.locationExist,
  requestController.create,
  AuthMiddleware.rememberMe
);


export default router;
