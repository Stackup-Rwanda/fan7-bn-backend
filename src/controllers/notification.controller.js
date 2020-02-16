import NotificationRepository from '../repositories/notification.repository';
import Response from '../utils/response';
import DbErrorHandler from '../utils/dbErrorHandler';
import userRepository from '../repositories/userRepository';

const notificationRepository = new NotificationRepository();

class NotificationController {
  /**
   *
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns {*} message
   */
  static async markAllNotificationsRead(req, res) {
    try {
      const { userData } = req;
      await notificationRepository.update({ user_id: userData.id }, { status: 'read' });
      return res
        .status(200)
        .json({
          status: res.statusCode,
          message: 'All notifications are marked as read'
        });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }

  /**
  *
  * @param {*} req
  * @param {*} res
  * @param {*} next
  * @returns {*} res
  */
  static async markOneNotificationRead(req, res) {
    try {
      const id = Number(req.params.id);
      const notificationFound = await notificationRepository.findById(id);
      if (!notificationFound) {
        res.status(404).json({ status: 404, error: 'Notification not found' });
      }

      await notificationRepository.update({ id }, { status: 'read' });
      return res.status(200).json({ status: 200, message: 'Notification marked as read' });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }

  /**
  *
  * @param {*} req
  * @param {*} res
  * @param {*} next
  * @returns {*} res
  */
  static async markOneNotificationUnread(req, res) {
    try {
      const id = Number(req.params.id);
      const notificationFound = await notificationRepository.findById(id);
      if (!notificationFound) {
        res.status(404).json({ status: 404, error: 'Notification not found' });
      }

      await notificationRepository.update({ id }, { status: 'unread' });
      return res.status(200).json({ status: 200, message: 'Notification marked as unread' });
    } catch (error) {
      return res.status(500).json({ status: 500, error: error.message });
    }
  }

  /**
  *
  * @param {*} req
  * @param {*} res
  * @returns {*} res
  */
  static async getAllNotifications(req, res) {
    let response;
    try {
      const { userData } = req;
      const notifications = await notificationRepository.findAll({ user_id: userData.id });
      if (notifications.length === 0) {
        response = new Response(res, 404, 'Notification not found');
        return response.sendErrorMessage();
      }

      response = new Response(res, 200, 'Your Notifications', notifications);
      return response.sendSuccessResponse();
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
  }

  /**
  *
  * @param {*} req
  * @param {*} res
  * @returns {*} res
  */
  static async getOneNotification(req, res) {
    let response;
    try {
      const id = parseInt(req.params.id, 10);
      const notification = await notificationRepository.findById(id);
      if (!notification) {
        response = new Response(res, 404, 'Notification not found');
        return response.sendErrorMessage();
      }

      response = new Response(res, 200, 'Notification', notification);
      return response.sendSuccessResponse();
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
  }

  /**
   * @description This helps to find all pending requests
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async getByStatus(req, res) {
    let response;
    try {
      const { userData } = req;
      const { value } = req.params;
      const status = value.toLowerCase();

      const notifications = await notificationRepository.findAll({ user_id: userData.id, status });
      if (notifications.length === 0) {
        response = new Response(res, 404, 'Notification not found');
        return response.sendErrorMessage();
      }

      response = new Response(res, 200, `All ${status} Notifications`, notifications);
      return response.sendSuccessResponse();
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
  }

  /**
  *
  * @param {*} req
  * @param {*} res
  * @returns {*} res
  */
  static async changePreference(req, res) {
    let response;
    try {
      const { userData } = req;
      const { emailNotification } = req.body;

      const preference = await userRepository.update({ id: userData.id }, { emailNotification });

      response = new Response(res, 200, `Preference changed ${emailNotification}`, preference[1][0]);
      return response.sendSuccessResponse();
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
  }
}
export default NotificationController;
