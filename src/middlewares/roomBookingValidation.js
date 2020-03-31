import 'dotenv';
import Response from '../utils/response';
import bookingSchema from '../modules/bookingSchema';
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
  static async valid(req, res, next) {
    const { userData } = req;
    // eslint-disable-next-line camelcase
    const { accommodation_id, room_id } = req.params;
    // eslint-disable-next-line camelcase
    const { checkin, checkout, trip_id } = req.body;
    const request = {
      accommodation_id, room_id, checkin, checkout, trip_id
    };
    const { error, value } = bookingSchema.bookSchema(request);
    try {
      if (error) {
        const response = new Response(
          res,
          422,
          error.details[0].message.split('"').join('')
        );
        return response.sendErrorMessage();
      }
      const isAccommodation = await AuthUtils.isAccommodation(
        value.accommodation_id
      );
      if (isAccommodation.dataValues.status !== 'Approved') {
        const response = new Response(
          res,
          405,
          'The following accommodation is not availble for bookings yet'
        );
        return response.sendErrorMessage();
      }
      const isRoom = await AuthUtils
        .isRoom({ accommodation_id: value.accommodation_id, id: value.room_id });
      if (isRoom === null) {
        const response = new Response(res, 404, 'We could not find an accommodation with the specified room');
        return response.sendErrorMessage();
      }
      if (isRoom.booked === true) {
        const response = new Response(res, 403, 'The room provided is taken, try another one');
        return response.sendErrorMessage();
      }

      const { dataValues } = await AuthUtils.loggedInUser(userData.id);
      if (
        dataValues.role !== 'requester' || dataValues.isVerified === false
      ) {
        const response = new Response(
          res,
          403,
          'you must be a verified requester to access this endpoint'
        );
        return response.sendErrorMessage();
      }
      req.value = value;
      next();
    } catch (err) {
      const response = new Response(res, 500, err);
      return response.sendErrorMessage();
    }
  }
}

export default AuthMiddleware;
