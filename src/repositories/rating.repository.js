import models from '../models';

const { Rating } = models;

class RatingRepository {
  /**
   * Add new rating to an accomodation.
   * @param {object} data .
   * @returns {object} rating.
   */
  static async addRate(data) {
    try {
      return await Rating.create(data, {
        fields: ['user_id', 'accommodation_id', 'ratings']
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  /**
    * @description findAll helps to find all reqests
    * @param {obj} options
    * @returns {*} requests
    */
  static async findAll(options = {}) {
    try {
      const ratings = await Rating.findAll(options);

      return ratings;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default RatingRepository;
