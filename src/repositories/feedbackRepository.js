import models from '../models';

const { Feedback } = models;

class FeedbackRepository {
  /**
   * Creates a new feedback.
   * @param {object} data .
   * @returns {object} feedback.
   */
  static async addFeedback(data) {
    try {
      return await Feedback.create(
        data,
        {
          fields: ['user_id', 'accommodation_id', 'feedback']
        }
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
export default FeedbackRepository;
