import models from '../models';

const { Location, Request } = models;

class DestinationRepository {
  /**
   * Gets all requests
   * @returns {object} destination object.
   */
  static async AllRequests() {
    const result = Request.count({
      where: { status: 'Approved' }
    });
    return result;
  }

  /**
   * Gets all destinations
   * @returns {object} destination object.
   */
  static async FetchAllDestinations() {
    const result = Location.findAll({
      attributes: ['destination', 'visit_count'],
      order: [
        ['visit_count', 'DESC'],
      ],
      limit: 10
    });
    return result;
  }
}

export default DestinationRepository;
