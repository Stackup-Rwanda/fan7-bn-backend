import models from '../models';

const { Booking, Accommodation, Room } = models;

/**
 * @description BookingRepository contains Booking repository
 */
class BookingRepository {
  /**
   * @description findAll helps to find all bookings
   * @param {Integer} userId
   * @param {*} limit
   * @param {*} offset
   * @returns {*} bookings
   */
  static async findAll(userId, limit, offset) {
    try {
      const bookings = await Booking.findAll({
        where: { user_id: userId },
        include: [
          { model: Accommodation, as: 'accommodation' },
          { model: Room, as: 'room' }
        ],
        limit: limit || null,
        offset: offset || 0,
        order: [['createdAt', 'DESC']]
      });

      return bookings;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   *
   * @param {*} id
   * @param {*} userId
   * @returns {obj} booking or null if is not found
   */
  static async findOne(id, userId) {
    try {
      const bookings = await Booking.findOne({
        where: { id, user_id: userId },
        include: [
          { model: Accommodation, as: 'accommodation' },
          { model: Room, as: 'room' }
        ]
      });

      return bookings;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
   * @description findByStatus helps to find booking by status
   * @param {Integer} status
   * @returns {*} bookings
   */
  static async findByStatus(status) {
    try {
      const bookings = await Booking.findAll({
        where: { status },
        include: [
          { model: Accommodation, as: 'accommodation' },
          { model: Room, as: 'room' }
        ]
      });

      return bookings;
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
     *
     * @param {integer} id
     * @returns {obj} record is object of id found or null
     */
  static async findById(id) {
    try {
      const record = await Booking.findByPk(id, {
        include: [
          { model: Accommodation, as: 'accommodation' },
          { model: Room, as: 'room' }
        ]
      });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default BookingRepository;
