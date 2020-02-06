import 'dotenv';
import Response from '../utils/response';
import RequestSchema from '../modules/requestSchema';

/**
 * @description ReqestMiddleware checks if the param id is valid
 */
class ReqestMiddleware {
  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
  */
  static async param(req, res, next) {
    const { error } = RequestSchema.requestParam(req.params);
    try {
      if (error) {
        const response = new Response(res, 422, error.message);
        return response.sendErrorMessage();
      }

      return next();
    } catch (err) {
      const response = new Response(res, 500, err || 'Internal server error');
      return response.sendErrorMessage();
    }
  }
}

export default ReqestMiddleware;
