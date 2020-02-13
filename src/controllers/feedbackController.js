import Response from '../utils/response';
import FeedbackServices from '../repositories/feedbackRepository';
import UserService from '../repositories/userRepository';
import AccommodationService from '../repositories/accommodationRepository';

class AccommodationFeedbackController {
  /**
   * Creates a new feedback.
   * @param {object} req request
   * @param {object} res response
   * @returns {object} response object
   */
  static async addFeedback(req, res) {
    try {
      const { feedback } = req.body;
      const accommodationID = Number(req.params.id);
      const AccommodationExists = await AccommodationService.findAccommodationById(accommodationID);
      if (!AccommodationExists) {
        const response = new Response(res, 404, 'Accommodation not found for your feedback');
        return response.sendErrorMessage();
      }
      const user = await UserService.findByUserId(req.userData.id);
      const newFeedback = await FeedbackServices.addFeedback({
        user_id: user.id,
        accommodation_id: accommodationID,
        feedback
      });

      const response = new Response(res, 201, 'feedback sucessfully created', newFeedback);
      response.sendSuccessResponse();
    } catch (error) {
      const response = new Response(res, 500, error);
      return response.sendErrorMessage();
    }
  }
}
export default AccommodationFeedbackController;
