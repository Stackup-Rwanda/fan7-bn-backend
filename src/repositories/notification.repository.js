import model from '../models';

const { Notification } = model;
/**
 * @description NotificationRepository contains Notification repository
 */
class NotificationRepository {
  /**
   * @description constructor handles the Notification model
   * Request Repository constructor
   * @constructor
   *
   */
  constructor() {
    this.db = Notification;
  }

  /**
   *
   * @param {object} field
   *
   * @param {object} changes to update for notification status
   *
   * @returns {object} updated notification status
   */
  async update(field, changes) {
    try {
      return await this.db.update(changes, { returning: true, where: field });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
     *
     * @param {integer} id
     * @returns {obj} record is object if id found or null if not
     */
  async findById(id) {
    try {
      const record = await this.db.findByPk(id);
      return record;
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default NotificationRepository;
