import 'dotenv';
import Response from '../utils/response';
import FeedbackSchema from '../modules/feedbackSchema';
/**
 * @description FeedbackMiddleware checks if the param id is valid
 */
class FeedbackMiddleware {
  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
  */
  static async FeedbackValidate(req, res, next) {
    const { error } = FeedbackSchema.createSchema(req.body);
    try {
      if (error) {
        const response = new Response(res, 400, error.message);
        return response.sendErrorMessage();
      }
      return next();
    } catch (err) {
      const response = new Response('Internal server error');
      return response.sendErrorMessage();
    }
  }
}
export default FeedbackMiddleware;
