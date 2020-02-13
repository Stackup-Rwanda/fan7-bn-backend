import express from 'express';
import connect from 'connect-multiparty';
import Accommodation from '../controllers/accommodation.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import AccommodationMiddleware from '../middlewares/accommodation.middleware';

const router = express.Router();
const connection = connect();

router.post('/', AuthMiddleware.verifyToken, AccommodationMiddleware.isHost, connection, AccommodationMiddleware.validate, Accommodation.createAccommodation);
router.patch('/:id/approve', AuthMiddleware.verifyToken, AuthMiddleware.isSuperAdmin, AccommodationMiddleware.param, Accommodation.accommodationApprove);
router.get('/', AuthMiddleware.verifyToken, Accommodation.getAllAccommodation);
router.get('/:id', AuthMiddleware.verifyToken, AccommodationMiddleware.param, Accommodation.getSpecificAccommodation);

export default router;
