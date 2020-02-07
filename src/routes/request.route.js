import express from 'express';
import requestController from '../controllers/requestController';
import AuthMiddleware from '../middlewares/auth.middleware';

const router = express.Router();

router.patch('/:id/reject', AuthMiddleware.verifyToken, requestController.rejectRequest);

export default router;
