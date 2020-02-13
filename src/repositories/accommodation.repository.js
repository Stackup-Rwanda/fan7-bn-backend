import model from '../models';

const { Accommodation } = model;

/**
 * @description RequestRepository contains Accommodation Request repository
 */
class RequestRepository {
  /**
   * @description findAll helps to find all reqests
   * @param {obj} options
   * @returns {*} requests
   */
  static async findAll(options = {}) {
    try {
      const accommodations = await Accommodation.findAll({ where: options });

      return accommodations;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description findByStatus helps to find reqest by status
   * @param {Integer} status
   * @returns {*} requests
   */
  static async findByStatus(status) {
    try {
      const requests = await Accommodation.findAll({ where: { status } });

      return requests;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @param {object} field
   *
   * @param {object} changes updates for user to from pending to approved
   *
   * @returns {object} updated user
   */

  static async accommodationApprove(field, changes) {
    try {
      const record = await Accommodation.update(changes, {
        returning: true, plain: true, where: field
      });

      return record;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
     *
     * @param {integer} id
     * @returns {obj} record is object of id found or null
     */
  static async findById(id) {
    try {
      const record = await Accommodation.findByPk(id);

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
     *
     * @param {obj} options
     * @returns {obj} record is object the that matches options
     */
  static async findOne(options) {
    try {
      const record = await Accommodation.findOne({ where: { ...options } });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
     *
     * @param {obj} id
     * @returns {obj} record is object the that matches options
     */
  static async findRequestById(id) {
    try {
      const record = await Accommodation.findOne({ where: { id } });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default RequestRepository;
