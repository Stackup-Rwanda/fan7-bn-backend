import model from '../models';

const { Accommodation } = model;

/**
 * @description RequestRepository contains Request repository
 */
class AccommodationRepository {
  /**
   *
   * @param {integer} id
   * @returns {obj} record is object if id found or null if not
   */
  static async findAccommodationById(id) {
    try {
      const record = await Accommodation.findByPk(id);
      return record;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default AccommodationRepository;
