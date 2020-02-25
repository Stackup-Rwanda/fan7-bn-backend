import Response from '../utils/response';
import BookingRepository from '../repositories/booking.repository';
import DbErrorHandler from '../utils/dbErrorHandler';
import pagination from '../utils/pagination.utils';

class bookingController {
  /**
   * @description This helps to find  all bookings
   * @param  {object} req - The booking object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async getAllBookings(req, res) {
    let response;
    try {
      const { userData } = req;
      const { limit, offset } = pagination(req.query);

      const bookings = await BookingRepository.findAll(userData.id, limit, offset);

      if (bookings.length === 0) {
        response = new Response(res, 404, 'No bookings found for you');
        return response.sendErrorMessage();
      }

      response = new Response(res, 200, 'All your bookings', bookings);
      return response.sendSuccessResponse();
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
  }

  /**
   * @description This helps to find booking by id
   * @param  {object} req - The booking object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async getOneBooking(req, res) {
    let response;
    try {
      const { userData } = req;
      const id = parseInt(req.params.id, 10);

      const booking = await BookingRepository.findOne(id, userData.id);

      if (!booking) {
        response = new Response(res, 404, 'No booking found for you');
        return response.sendErrorMessage();
      }

      response = new Response(res, 200, 'Your booking info', booking);
      return response.sendSuccessResponse();
    } catch (error) {
      return DbErrorHandler.handleSignupError(error);
    }
  }
}
export default bookingController;
