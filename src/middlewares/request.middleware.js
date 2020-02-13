import 'dotenv';
import Response from '../utils/response';
import RequestSchema from '../modules/requestSchema';
import validator from '../utils/validator';

const { trimmer } = validator;
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
  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
  */

  static async validate(req, res, next) {
    const requestData = trimmer(req.body);
    const { error } = RequestSchema.updateSchema(requestData);
    try {
      if (error) {
        const response = new Response(res, 422, error.message);
        return response.sendErrorMessage();
      }
      req.requestData = requestData;
      return next();
    } catch (err) {
      const response = new Response(res, 500, err);
      return response.sendErrorMessage();
    }
  }
}

export default ReqestMiddleware;
