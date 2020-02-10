import express from 'express';
import RequestController from '../controllers/requestController';
import AuthMiddleware from '../middlewares/auth.middleware';
import RequestMiddleware from '../middlewares/request.middleware';

const router = express.Router();

router.get('/', AuthMiddleware.verifyToken, RequestController.getAll);
router.get('/:id', RequestMiddleware.param, AuthMiddleware.verifyToken, RequestController.getOne);
router.get('/status/:value', AuthMiddleware.verifyToken, RequestController.getByStatus);
router.patch('/:id/approve', RequestMiddleware.param, AuthMiddleware.verifyToken, AuthMiddleware.isManager, RequestController.approve);
router.patch('/:id/reject', AuthMiddleware.verifyToken, RequestController.rejectRequest);

export default router;
