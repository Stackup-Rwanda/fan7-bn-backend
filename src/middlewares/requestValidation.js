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
      accommodationId,
      dob,
      passportName,
      passportNumber,
      gender,
      rememberMe
    } = req.body;
    const request = {
      origin,
      destination,
      travelDate,
      reason,
      accommodationId,
      dob,
      passportName,
      passportNumber,
      gender,
      rememberMe
    };
    const { error, value } = requestShema.destinationSchema(request);
    try {
      if (error) {
        const response = new Response(res, 422, error.details[0].message.split('"').join(''));
        response.sendErrorMessage();
      } else {
        const { userData } = req;
        const { dataValues } = await AuthUtils.loggedInUser(userData.id);
        if (dataValues.role !== 'requester' || dataValues.isVerified === false) {
          const response = new Response(
            res,
            403,
            'You have no rights over this endpoint'
          );
          return response.sendErrorMessage();
        }
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
