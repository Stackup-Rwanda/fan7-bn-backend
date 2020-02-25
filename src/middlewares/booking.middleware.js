import 'dotenv';
import Response from '../utils/response';
import BookingSchema from '../modules/bookingSchema';

class AccommodationMiddleware {
  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
  */
  static async param(req, res, next) {
    const { error } = BookingSchema.param(req.params);
    try {
      if (error) {
        const response = new Response(res, 422, error.message);
        return response.sendErrorMessage();
      }

      return next();
    } catch (err) {
      const response = new Response(res, 500, err.message);
      return response.sendErrorMessage();
    }
  }
}
export default AccommodationMiddleware;
