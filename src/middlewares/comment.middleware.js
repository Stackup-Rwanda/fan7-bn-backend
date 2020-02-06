import 'dotenv';
import Response from '../utils/response';
import CommentSchema from '../modules/commentSchema';
/**
 * @description CommentMiddleware checks if the param id is valid
 */
class CommentMiddleware {
  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
  */
  static async CommentValidate(req, res, next) {
    const { error } = CommentSchema.creatSchema(req.body);
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
export default CommentMiddleware;
