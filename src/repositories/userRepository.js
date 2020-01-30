import model from '../models';

const { User } = model;

/**
 * @description UserRepository contains user repository
 */
class UserRepository {
  /**
   * @description constructor handles the user model
   * User Repository constructor
   * @constructor
   *
   */
  constructor() {
    this.db = User;
  }

  /**
     *
     * @param {string} email
     * @returns {obj} record is object if email found or null if not
     */
  async findByEmail(email) {
    try {
      const record = await this.db.findOne({ where: { email } });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
     *
     * @param {string} userName
     * @returns {obj} record is object if userName found or null if not
     */
  async findByUserName(userName) {
    try {
      const record = await this.db.findOne({ where: { user_name: userName } });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new UserRepository();
