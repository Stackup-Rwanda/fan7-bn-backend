import model from '../models';
// import accommodation from '../models/accommodation';

const { Accommodation } = model;

/**
 * @description UserRepository contains request repository
 */
class RequestRepository {
  /**
   * @description constructor handles the class models
   * Request Repository constructor
   * @constructor
   *
   */
  constructor() {
    this.Accommodation = Accommodation;
  }

  /**
   *
   * @param {integer} id
   * @returns {obj} record is object if id found or null if not
   */
  async findById(id) {
    try {
      const record = await this.Accommodation.findOne({ where: { id } });

      return record;
    } catch (error) {
      throw new Error(error);
    }
  }
}

export default new RequestRepository();
