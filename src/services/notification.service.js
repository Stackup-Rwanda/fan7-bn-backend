/* eslint-disable import/no-cycle */
import { io } from '../server';
import NotificationRepository from '../repositories/notification.repository';
import Mailer from '../utils/mailer.util';
import NotificationUtils from '../utils/notification.utils';

const notificationRepository = new NotificationRepository();

/**
 *
 * @description NotificationService contains function fto send notification.
 */
class NotificationService {
  /**
   * Send notification
   * @param { String } eventType
   * @param { Number } requestId
   * @param { String } type
   * @param { String } message
   * @param { String } link
   * @returns { obj } Notification record
   */
  static async send({ eventType, requestId, role }) {
    try {
      const { notification, receiver } = await NotificationUtils(eventType, requestId, role);
      const record = await notificationRepository.create(notification);

      notification.id = record.id;
      notification.time = Date.now();

      switch (eventType) {
        case 'created_request':
          io.sockets.in(`notification_${receiver.id}`).emit('created_request', notification);
          break;
        case 'edited_request':
          io.sockets.in(`notification_${receiver.id}`).emit('edited_request', notification);
          break;
        case 'approved_request':
          io.sockets.in(`notification_${receiver.id}`).emit('approved_request', notification);
          break;
        case 'rejected_request':
          io.sockets.in(`notification_${receiver.id}`).emit('rejected_request', notification);
          break;
        case 'commented_request':
          io.sockets.in(`notification_${receiver.id}`).emit('commented_request', notification);
          break;
        default:
          break;
      }

      if (receiver.emailNotification) {
        const mailer = new Mailer('Barefoot Nomad Notification', receiver, notification.message, notification.link);
        mailer.sendMail();
      }

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default NotificationService;
