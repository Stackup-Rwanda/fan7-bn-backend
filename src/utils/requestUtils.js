import 'dotenv';
import RequestRepository from '../repositories/requestRepository';

/**
 * @description requestUtils requests utility class
 */
class RequestUtils {
  /**
   *
   * @param {number} id
   * @returns {boolean} check if accomodation exists
   */
  static async accommodationExists(id) {
    const accommodationExists = await RequestRepository.findById(id);
    return accommodationExists;
  }
}

export default RequestUtils;
