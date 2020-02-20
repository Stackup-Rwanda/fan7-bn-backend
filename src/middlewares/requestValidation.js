import 'dotenv';
import Response from '../utils/response';
import requestShema from '../modules/requestSchema';
import AuthUtils from '../utils/auth.utils';

/**
 * @description Middleware used to validate data related to requests
 */
class AuthMiddleware {
  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
   */
  static async oneway(req, res, next) {
    const {
      origin,
      destination,
      travelDate,
      reason,
      dob,
      accommodationId,
      passportName,
      passportNumber,
      gender,
      rememberMe
    } = req.body;
    const request = {
      origin,
      destination,
      travelDates: travelDate,
      reason,
      dob,
      accommodationId,
      passportName,
      passportNumber,
      gender,
      rememberMe
    };
    const { error, value } = requestShema.destinationSchema(request);
    try {
      if (error) {
        const response = new Response(
          res,
          422,
          error.details[0].message.split('"').join('')
        );
        response.sendErrorMessage();
      } else {
        const { userData } = req;
        const { dataValues } = await AuthUtils.loggedInUser(userData.id);
        if (
          dataValues.role !== 'requester' || dataValues.isVerified === false
        ) {
          const response = new Response(
            res,
            403,
            'You have no rights over this endpoint'
          );
          return response.sendErrorMessage();
        }
        value.travelDates = travelDate;
        req.value = value;
        next();
      }
    } catch (err) {
      const response = new Response(res, 500, 'Internal Server Error');
      return response.sendErrorMessage();
    }
  }

  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
   */
  static async returnTrip(req, res, next) {
    const { returnDate } = req.body;
    const request = {
      travelDate: req.value.travelDates,
      returnDate
    };
    const { error } = requestShema.returnDateSchema(request);
    try {
      if (error) {
        const response = new Response(
          res,
          422,
          error.details[0].message.split('"').join('')
        );
        return response.sendErrorMessage();
      }
      next();
    } catch (err) {
      const response = new Response(res, 500, 'Internal Server Error');
      return response.sendErrorMessage();
    }
  }

  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
   */
  static async multiCity(req, res, next) {
    const { error, value } = requestShema.multiCitySchema(req.body);
    try {
      if (error) {
        const response = new Response(
          res,
          422,
          error.details[0].message.split('"').join('')
        );
        response.sendErrorMessage();
      } else {
        const { userData } = req;
        const { dataValues } = await AuthUtils.loggedInUser(userData.id);
        if (
          dataValues.role !== 'requester' || dataValues.isVerified === false
        ) {
          const response = new Response(
            res,
            403,
            'Only verified requesters can make trip requests'
          );
          return response.sendErrorMessage();
        }
        if (req.body.travelDates.length !== req.body.destination.length) {
          const response = new Response(res, 422, 'travelDates length must eqaul to the number of destinations');
          return response.sendErrorMessage();
        }
        value.returnDate = req.body.returnDate;
        value.travelDates = req.body.travelDates;
        req.value = value;
        next();
      }
    } catch (err) {
      const response = new Response(res, 500, 'Internal Server Error');
      return response.sendErrorMessage();
    }
  }
}

export default AuthMiddleware;
