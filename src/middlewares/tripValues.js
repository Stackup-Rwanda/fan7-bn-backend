import { getCode } from 'country-list';
import allCities from 'all-the-cities';
import moment from 'moment';
import locationFormat from '../utils/locationFormat';
import Response from '../utils/response';
import location from '../repositories/requestRepository';


/** Class checking valid trip values. */
export default class TripValues {
/**  checks if Dates make sense
 * @param {object} req The first number.
 * @param {object} res The first number.
 * @param {object} next The first number.
 * @returns {object} The User object.
 */
  static async validOrigin(req, res, next) {
    const { origin } = req.value;
    const checkOrigin = locationFormat.location(origin);

    if (getCode(checkOrigin.country) === undefined) {
      const response = new Response(res, 422, 'origin must have a valid country');
      return response.sendErrorMessage();
    }

    if (allCities.filter(obj => obj.name === checkOrigin.city)
      .length === 0) {
      const response = new Response(res, 422, 'please provide a valid city name on origin');
      return response.sendErrorMessage();
    }
    if (allCities.find(obj => obj.name === checkOrigin.city)
      .country !== getCode(checkOrigin.country)) {
      const response = new Response(res, 422, 'the city provided doesn not belong to that country');
      return response.sendErrorMessage();
    }
    next();
  }

  /**  checks if dates are valid
  * @param {object} req The request.
  * @param {object} res The response.
  * @param {object} next Forward to the next functions.
  * @returns {object} The request object.
  */
  static async areValidDates(req, res, next) {
    try {
      const { userData } = req;
      const { travelDates, returnDate } = req.value;
      const newTravelDates = Array.isArray(req.body.travelDates) ? travelDates : [travelDates];
      const { dataValues } = await location
        .checkTravevalDateExist(userData.id, Array.isArray(travelDates)
          ? travelDates[0] : travelDates);
      if (dataValues && dataValues.status !== 'Rejected') {
        const response = new Response(res, 403, `A ${dataValues.status} request with the provided initial time exist already`);
        return response.sendErrorMessage();
      }
      if (returnDate !== undefined) {
        if (moment(newTravelDates[newTravelDates.length - 1]).isAfter(returnDate) === true) {
          const response = new Response(res, 422, 'Return Date must be greater than the last travel date');
          return response.sendErrorMessage();
        }
      }
      if (newTravelDates.length > 1) {
        for (let date = 0; date < newTravelDates.length - 1; date += 1) {
          if (moment(newTravelDates[date]).isAfter(newTravelDates[date + 1]) === true) {
            const response = new Response(res, 422, 'The next Travel Date must be greater than the previous one');
            return response.sendErrorMessage();
          }
        }
      }

      next();
    } catch (error) {
      const response = new Response(res, 500, error);
      return response.sendErrorMessage();
    }
  }

  /**
   * checks if location is valid
   * @param {object} req The request.
   * @param {object} res The response.
   * @param {object} next Forwards to the next function
   * @returns {object} The location object.
   */
  static async locationExist(req, res, next) {
    const destination = Array
      .isArray(req.value.destination) ? req.value.destination : [req.value.destination];
    if (destination[0].toLowerCase() === req.value.origin.toLowerCase()) {
      const response = new Response(
        res,
        403,
        'Your initial destination can not be the same as where you are from'
      );
      return response.sendErrorMessage();
    }
    for (let i = 0; i < destination.length - 1; i += 1) {
      if (destination[i] === destination[i + 1]) {
        const response = new Response(
          res,
          422,
          'Your next destination must be different than the previous one'
        );
        return response.sendErrorMessage();
      }
    }
    const existLocations = (await location.findAllLoc()).map((l) => l.destination);
    const notlocation = destination
      .filter((place) => !existLocations.includes(place.toLowerCase()));
    if (notlocation.length > 0) {
      const response = new Response(
        res,
        422,
        'Barefoot does not Operate in that location'
      );
      return response.sendErrorMessage();
    }
    req.body.destination = destination;
    next();
  }
}
