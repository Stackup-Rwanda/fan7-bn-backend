import { getCode } from 'country-list';
import allCities from 'all-the-cities';
import locationFormat from '../utils/locationFormat';
import Response from '../utils/response';
import requestUtils from '../utils/requestUtils';


/** Class checking valid trip values. */
export default class TripValues {
/**  checks if Dates make sense
 * @param {object} req The first number.
 * @param {object} res The first number.
 * @param {object} next The first number.
 * @returns {object} The User object.
 */
  static async locationExist(req, res, next) {
    const { origin, destination } = req.value;
    const checkOrigin = locationFormat.location(origin);
    const checkDestination = locationFormat.location(destination);

    if (getCode(checkOrigin.country) === undefined) {
      const response = new Response(res, 422, 'origin must have a valid country');
      return response.sendErrorMessage();
    }
    if (getCode(checkDestination.country) === undefined) {
      const response = new Response(res, 422, 'destination must have a valid country');
      return response.sendErrorMessage();
    }

    if (allCities.filter(obj => obj.name === checkOrigin.city).length === 0) {
      const response = new Response(res, 422, 'please provide a valid city name on origin');
      return response.sendErrorMessage();
    }
    if (allCities.find(obj => obj.name === checkOrigin.city).country !== getCode(checkOrigin.country)) {
      const response = new Response(res, 422, 'the city provided doesn not belong to that country');
      return response.sendErrorMessage();
    }
    if (allCities.filter(obj => obj.name === checkDestination.city).length === 0) {
      const response = new Response(res, 422, 'please provide a valid city name on destination');
      return response.sendErrorMessage();
    }
    if (allCities.find(obj => obj.name === checkDestination.city).country !== getCode(checkDestination.country)) {
      const response = new Response(res, 422, 'the city provided doesn not belong to that country');
      return response.sendErrorMessage();
    }
    next();
  }

  /**  checks if accomodation exists
  * @param {object} req The first number.
  * @param {object} res The first number.
  * @param {object} next The first number.
  * @returns {object} The User object.
  */
  static async accommodationExist(req, res, next) {
    try {
      const { value } = req;
      const storedAccommodation = await requestUtils.accommodationExists(value.accommodationId);

      if (!storedAccommodation) {
        const response = new Response(res, 404, 'accommodation not found');
        return response.sendErrorMessage();
      }
      next();
    } catch (error) {
      const response = new Response(res, 500, error);
      return response.sendErrorMessage();
    }
  }
}
