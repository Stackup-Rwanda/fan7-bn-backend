import express from 'express';
import connect from 'connect-multiparty';
import Accommodation from '../controllers/accommodation.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import LikeController from '../controllers/LikeController';
import AccommodationMiddleware from '../middlewares/accommodation.middleware';
import roomBookingValidation from '../middlewares/roomBookingValidation';

const router = express.Router();
const connection = connect();

router.post('/', AuthMiddleware.verifyToken, AccommodationMiddleware.isHost, connection, AccommodationMiddleware.validate, AccommodationMiddleware.IsLocationValid, Accommodation.createAccommodation);
router.patch('/:id/approve', AuthMiddleware.verifyToken, AuthMiddleware.isSuperAdmin, AccommodationMiddleware.param, Accommodation.accommodationApprove);
router.get('/', AuthMiddleware.verifyToken, Accommodation.getAllAccommodation);
router.get('/:id', AuthMiddleware.verifyToken, AccommodationMiddleware.param, Accommodation.getSpecificAccommodation);
router.post('/:id/like', AuthMiddleware.verifyToken, LikeController.LikeOrUnlike);
router.get('/:id/likes', AuthMiddleware.verifyToken, LikeController.countAccommodationLikes);
router.post('/:accommodation_id/book/:room_id', AuthMiddleware.verifyToken, roomBookingValidation.valid, Accommodation.bookRoom);
router.post('/:accommodation_id/room', AuthMiddleware.verifyToken, connection, AccommodationMiddleware.roomValidation, Accommodation.createRoom);
router.get('/:accommodationId/rooms', AuthMiddleware.verifyToken, AccommodationMiddleware.param, Accommodation.getAllRooms);
router.get('/:accommodationId/rooms/:roomId', AuthMiddleware.verifyToken, AccommodationMiddleware.param, Accommodation.getRoom);
router.get('/:accommodationId/rooms/status/:status', AuthMiddleware.verifyToken, AccommodationMiddleware.param, Accommodation.getRoomsByStatus);

export default router;
