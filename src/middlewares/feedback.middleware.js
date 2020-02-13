import 'dotenv';
import Response from '../utils/response';
import FeedbackSchema from '../modules/feedbackSchema';
import RequestRepository from '../repositories/requestRepository';
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
    const { userData } = req;
    const { error } = FeedbackSchema.createSchema(req.body);
    try {
      const accommodationId = Number(req.params.id);
      const owner = await RequestRepository
        .checkIfUserCheckedInAccommodation(userData.id, accommodationId);

      if (!owner) {
        const response = new Response(res, 403, 'You are not allowed to provide feedback on this accommodation');
        return response.sendErrorMessage();
      }

      if (error) {
        const response = new Response(res, 400, error.message);
        return response.sendErrorMessage();
      }
      return next();
    } catch (err) {
      const response = new Response(res, 500, err.message);
      return response.sendErrorMessage();
    }
  }
}
export default FeedbackMiddleware;
