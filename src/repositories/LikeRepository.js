/* eslint-disable camelcase */
/* eslint-disable no-useless-catch */
import database from '../models';

const { Like, Accommodation } = database;

class LikeRepository {
  /**
   * Creates a new Like.
   * @param {object} user_id
   * @param {object} accommodation_id
   * @returns {object} Like.
   */
  static async Like({ user_id, accommodation_id }) {
    try {
      const result = await Like.create({
        user_id,
        accommodation_id
      }, {
        fields: ['user_id', 'accommodation_id']
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * check if accommodation exists.
   * @param {object} accommodation_id .
   * @returns {object} Like object.
   */
  static async checkAccommodation(accommodation_id) {
    try {
      const result = await Accommodation.findOne({
        where: { id: accommodation_id }
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if like exists by user id and accommodatio id.
   * @param {object} user_id.
   * @param {object} accommodation_id.
   * @returns {object} Like object.
   */
  static async checkLikes({ user_id, accommodation_id }) {
    try {
      const result = await Like.findAll({
        where:
          {
            user_id, accommodation_id
          }
      });
      return result;
    } catch (error) {
      throw (error);
    }
  }

  /**
   * Counting likes on a certain accommodation
   * @param {object} accommodation_id
   * @returns {object} Like object.
   */
  static async accommodationLikes(accommodation_id) {
    try {
      const result = await Like.count({
        where: [
          {
            accommodation_id
          }
        ]
      });
      return result;
    } catch (error) {
      throw (error);
    }
  }
  /**
   * unliking an accommodation
   * @param {object} user_id
   * @param {object} accommodation_id
   * @returns {object} delete object.
   */

  static async unLike({ user_id, accommodation_id }) {
    try {
      const result = await Like.destroy({
        where: [{ user_id, accommodation_id }]
      });
      return result;
    } catch (error) {
      throw error;
    }
  }
}
export default LikeRepository;
