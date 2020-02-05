import NotificationRepository from '../repositories/notification.repository';

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
}
export default NotificationController;
