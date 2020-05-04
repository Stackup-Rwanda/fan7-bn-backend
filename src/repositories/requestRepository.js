import { Op } from 'sequelize';
import model from '../models';

const { Request, User } = model;
const { Accommodation, Booking } = model;
const { Location } = model;

/**
 * @description RequestRepository contains Request repository
 */
class RequestRepository {
  /**
   * @description findAll helps to find all reqests
   * @param {obj} options
   * @param {*} limit
   * @param {*} offset
   * @returns {*} requests
   */
  static async findAll(options = {}, limit, offset) {
    try {
      const requests = await Request.findAndCountAll({
        where: options,
        limit: limit || null,
        offset: offset || 0,
        order: [['createdAt', 'DESC']],
        include: [{ model: User, as: 'user' }]
      });
      return requests;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description findByIds helps to find reqest by array of ids
   * @param {Array} arrayIds
   * @param {obj} options
   * @param {*} limit
   * @param {*} offset
   * @returns {*} requests
   */
  static async findByIds(arrayIds, options, limit, offset) {
    try {
      const requests = await Request.findAndCountAll({
        where: { user_id: { [Op.in]: arrayIds }, ...options },
        limit: limit || null,
        offset: offset || 0,
        order: [['createdAt', 'DESC']],
        include: [{ model: User, as: 'user' }]
      });

      return requests;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description findRequestByTimeframe helps to find reqest in a certain time frame
   * @param {Array} arrayIds
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {*} statistics
   */
  static async findRequestByTimeframe(arrayIds, startDate, endDate) {
    try {
      const statistics = await Request.count({
        where: {
          user_id: { [Op.in]: arrayIds },
          createdAt: {
            [Op.between]: [startDate, endDate]
          }
        },
      });

      return statistics;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description findByIds helps to find reqest by array of ids and status
   * @param {Array} arrayIds
   * @param {obj} id
   * @returns {*} requests
   */
  static async findByIdsAndId(arrayIds, id) {
    try {
      const requests = await Request.findOne({
        where: { user_id: { [Op.in]: arrayIds }, id },
        include: [{ model: User, as: 'user' }]
      });

      return requests;
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
      const requests = await Request.findAll({ where: { status } });

      return requests;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {integer} id
   * @returns {obj} record is object if id found or null if not
   */
  static async findAccommodationById(id) {
    try {
      const record = await Accommodation.findOne({ where: { id } });
      return record;
    } catch (error) {
      throw new Error(error);
    }
  }/**
   * @param {object} field
   *
   * @param {object} changes to update for user
   *
   * @returns {object} updated user
   */

  static async update(field, changes) {
    try {
      const record = await Request.update(changes, { returning: true, plain: true, where: field });

      return record;
    } catch (e) {
      throw new Error(e);
    }
  }

  /**
     *
     * @param {integer} id
     * @returns {obj} record is object if id found or null if not
     */
  static async findById(id) {
    try {
      const record = await Request.findByPk(id, { include: [{ model: User, as: 'user' }] });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
     *
     * @param {obj} options
     * @returns {obj} record is object if match options
     */
  static async findOne(options) {
    try {
      const record = await Request.findOne({
        where: { ...options },
        include: [{ model: User, as: 'user' }]
      });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
     *
     * @param {obj} id
     * @returns {obj} record is object if match options
     */
  static async findRequestById(id) {
    try {
      const record = await Request.findOne({ where: { id }, include: [{ model: User, as: 'user' }] });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Check if a user has check in the accomodation.
   * @param {Integer} userId
   * @param {Integer} accommodationId
   * @returns {object} request.
   */
  static async checkIfUserCheckedInAccommodation(userId, accommodationId) {
    try {
      const result = await Booking.findOne({
        where: { user_id: userId, accommodation_id: accommodationId }
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Check if a user has check in the accomodation.
   * @param {Integer} userId
   * @param {Date} travelDate
   * @returns {object} request.
   */
  static async checkTravevalDateExist(userId, travelDate) {
    try {
      const result = await Request.findOne({
        where: {
          user_id: userId,
          travel_date: { [Op.contains]: [travelDate] }
        }
      });
      return result || false;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Returns all locations
   * @returns {object} all locations.
   */
  static async findAllLoc() {
    const result = await Location.findAll();
    return result;
  }
}

export default RequestRepository;
