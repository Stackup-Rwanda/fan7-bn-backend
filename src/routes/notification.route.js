import express from 'express';
import Notification from '../controllers/notification.controller';
import AuthMiddleware from '../middlewares/auth.middleware';
import NotificationMiddleware from '../middlewares/notification.middleware';

const router = express.Router();

router.patch('/', AuthMiddleware.verifyToken, Notification.markAllNotificationsRead);
router.patch('/:id/read', NotificationMiddleware.param, AuthMiddleware.verifyToken, Notification.markOneNotificationRead);
router.patch('/:id/unread', NotificationMiddleware.param, AuthMiddleware.verifyToken, Notification.markOneNotificationUnread);

export default router;
