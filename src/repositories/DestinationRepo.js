import models from '../models';

const { Location, Request } = models;

class DestinationRepository {
  /**
   * Gets one destination
   * @returns {object} destination object.
   */
  static async AllRequests() {
    const result = Request.count();
    return result;
  }

  /**
   * Gets one destination
   * @returns {object} destination object.
   */
  static async FetchAllDestinations() {
    const result = Location.findAll({
      attributes: ['destination', 'visitCount'],
      order: [
        ['visitCount', 'DESC'],
      ],
      limit: 10
    });
    return result;
  }
}

export default DestinationRepository;
