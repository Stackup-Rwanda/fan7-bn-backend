import models from '../models';

const { Accommodation, Room, Location } = models;

/**
 * @description AccommodationRepository contains Accommodation Request repository
 */
class AccommodationRepository {
  /**
   * @description findAll helps to find all reqests
   * @param {obj} options
   * @param {*} limit
   * @param {*} offset
   * @returns {*} requests
   */
  static async findAll(options = {}, limit, offset) {
    try {
      const accommodations = await Accommodation.findAndCountAll({
        where: options,
        attributes: ['id', 'name', 'address', 'amenities', 'services', 'status', 'image', 'geo_location', 'status', 'description',
          [models.sequelize.literal('(SELECT COUNT(*) FROM "Rooms" WHERE "Rooms".accommodation_id = "Accommodation"."id")'), 'room_count']],
        limit: limit || null,
        offset: offset || 0,
        order: [['createdAt', 'DESC']]
      });

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
        returning: true,
        plain: true,
        where: field
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

  /**
   * @description findAllRooms helps to find all rooms
   * @param {Integer} accommodationId
   * @param {Integer} limit
   * @param {Integer} offset
   * @returns {*} rooms
   */
  static async findAllRooms(accommodationId, limit, offset) {
    try {
      const rooms = await Room.findAndCountAll({
        where: { accommodation_id: accommodationId },
        limit: limit || null,
        offset: offset || 0,
        order: [['createdAt', 'DESC']]
      });

      return rooms;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description findAllRooms helps to find all rooms by status
   * @param {Integer} accommodationId
   * @param {boolean} booked
   * @param {Integer} limit
   * @param {Integer} offset
   * @returns {*} rooms
   */
  static async findAllRoomsByStatus(accommodationId, booked, limit, offset) {
    try {
      const rooms = await Room.findAll({
        where: { accommodation_id: accommodationId, booked },
        limit: limit || null,
        offset: offset || 0,
        order: [['createdAt', 'DESC']]
      });

      return rooms;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description findOneRoom helps to find a room
   * @param {Integer} id
   * @returns {*} room
   */
  static async findOneRoom(id) {
    try {
      const room = await Room.findByPk(id);

      return room;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * Returns one location
   * @param {String} location location
   * @returns {object} one location.
   */
  static async findOneLoc(location) {
    const result = await Location.findOne({
      where: { destination: location }
    });
    return result;
  }
}

export default AccommodationRepository;
