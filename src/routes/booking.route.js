import express from 'express';
import Booking from '../controllers/booking.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import BookingMiddleware from '../middlewares/booking.middleware';

const router = express.Router();

router.get('/', AuthMiddleware.verifyToken, Booking.getAllBookings);
router.get('/:id', AuthMiddleware.verifyToken, BookingMiddleware.param, Booking.getOneBooking);

export default router;
