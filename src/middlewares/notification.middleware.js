import 'dotenv';
import Response from '../utils/response';
import NotificationSchema from '../modules/notification.schema';
/**
 * @description NotificationMiddleware checks if the notification ID is valid
 */
class NotificationMiddleware {
  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards to the next middleware function
   * or controller if there is no middleware
   * @returns {obj} returns a response object
  */
  static async param(req, res, next) {
    const { error } = NotificationSchema.notificationParam(req.params);
    if (error) {
      const response = new Response(res, 400, error.message);
      return response.sendErrorMessage();
    }
    return next();
  }
}
export default NotificationMiddleware;
