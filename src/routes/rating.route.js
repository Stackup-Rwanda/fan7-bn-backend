import express from 'express';
import ratingController from '../controllers/rating.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import RatingMiddleware from '../middlewares/rating.middleware';

const router = express.Router();

router.post('/:id/rate', AuthMiddleware.verifyToken, RatingMiddleware.UserValidate, RatingMiddleware.RatingValidate, ratingController.addRate);

export default router;
