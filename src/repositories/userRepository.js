import model from '../models';

const { User, Request, Room } = model;

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
    this.Request = Request;
    this.Room = Room;
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

  /**
     *
     * @param {integer} id
     * @returns {obj} record is object if user found or null if not
     */
  async findByUserId(id) {
    try {
      const record = await this.db.findOne({ where: { id } });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {object} userField
   *
   * @param {object} changes to update for user
   *
   * @returns {object} updated user
   */
  async update(userField, changes) {
    try {
      return await this.db.update(changes, { returning: true, where: userField });
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
   *
   * @param {string} email
   *
   * @param {object} changes to update for user
   *
   * @returns {object} updated user
   */
  async verify(email, changes) {
    try {
      return await this.db.update(changes, { returning: true, where: { email } });
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

  /**
     *
     * @param {integer} userId
     * @returns {obj} Return Request found
     */
  async findRequestByUserId(userId) {
    try {
      const request = await this.Request.findOne({ where: { user_id: userId }, order: [['id', 'DESC']] });
      return request;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
     * @param {integer} id
     * @param {string} role
     * @returns {obj} record is object if id found or null if not
     */
  async findByIdAndRole(id, role) {
    try {
      const record = await this.db.findOne({ where: { id, role } });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
     *
     * @param {string} role
     * @returns {obj} record is object if user found or null if not
     */
  async findByRole(role) {
    try {
      const record = await this.db.findOne({ where: { role } });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
     *
     * @param {string} managerEmail
     * @returns {obj} record is object if managerEmail found or null if not
     */
  async findByLineManager(managerEmail) {
    try {
      const record = await this.db.findAll({ where: { line_manager: managerEmail }, attributes: ['id', 'user_name', 'email'] });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
     *
     * @param {obj} data
     * @returns {obj} record is object if managerEmail found or null if not
     */
  async findByAccommodationIdAndRoomId(data) {
    try {
      const record = await this.Room.findOne({
        where: { accommodation_id: data.accommodation_id, id: data.id }
      });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
     *
     * @param {obj} where
     * @returns {obj} record is object if managerEmail found or null if not
     */
  async findByAccommodationIdAndRoomId(where) {
    try {
      const record = await this.Room.findOne({ where });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new UserRepository();
