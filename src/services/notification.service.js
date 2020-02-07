/* eslint-disable import/no-cycle */
import { io } from '../server';
import NotificationRepository from '../repositories/notification.repository';

const notificationRepository = new NotificationRepository();

/**
 * This class contains functions for all notification service.
 * @class NotificationService
 */
class NotificationService {
  /**
   * Send notification
   * @param { String } eventType
   * @param { Number } receiverId
   * @param { String } title
   * @param { Number } requestId
   * @param { String } message
   * @returns { Promise } eventEmit
   */
  static async sendNotification({
    eventType, userId, requestId, type, message
  }) {
    try {
      const notification = {
        user_id: userId, requst_id: requestId, type, message
      };

      await notificationRepository.create(notification);

      const eventEmit = io.emit(eventType, notification);
      return eventEmit;
    } catch (error) {
      return error;
    }
  }
}

export default NotificationService;
