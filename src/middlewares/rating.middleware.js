import 'dotenv';
import models from '../models';
import Response, { onError } from '../utils/response';
import RatingSchema from '../modules/rating.schema';

const { Request } = models;
/**
 * @description RatingMiddleware checks if rating input is valid
 */
class RatingMiddleware {
  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
  */
  static async RatingValidate(req, res, next) {
    const { error } = RatingSchema.creatSchema(req.body);
    try {
      if (error) {
        const response = new Response(res, 400, error.message);
        return response.sendErrorMessage();
      }
      return next();
    } catch (err) {
      const response = new Response(res, 500, 'Internal server error');
      return response.sendErrorMessage();
    }
  }

  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
  */
  static async UserValidate(req, res, next) {
    const accommodationId = req.params.id;
    const userId = req.userData.id;
    const grantUser = await Request.findOne({
      where: {
        user_id: userId,
        accommodation_id: accommodationId
      }
    });

    if (grantUser) {
      return next();
    }
    return onError(res, 401, 'Sorry, You can not rate this centre');
  }
}
export default RatingMiddleware;
