import models from '../models';
import Response from '../utils/response';
import AccommodationRepository from '../repositories/accommodation.repository';
import DbErrorHandler from '../utils/dbErrorHandler';
import AuthUtils from '../utils/auth.utils';

const { Accommodation, Room, Booking } = models;

class AccommodationController {
  static async createAccommodation(req, res) {
    let response;
    try {
      const { userData } = req;
      const {
        name,
        address,
        description,
        image,
        geoLocation,
        services,
        rooms,
        amenities,
        status
      } = req.accommodationData;
      const data = {
        user_id: userData.id,
        name,
        address,
        description,
        image,
        rooms,
        geo_location: geoLocation,
        services,
        amenities,
        status
      };
      const { dataValues } = await Accommodation.create(data);
      if (dataValues) {
        response = new Response(res, 201, 'Your request to create an accommodation has been sent successfully, wait for approval', dataValues);
        return response.sendSuccessResponse();
      }
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
  }

  /**
   * @description This helps a super admin to approve an accommodation
   * request created by a host-supplier
   * @param  {object} req - The accommodation object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async accommodationApprove(req, res) {
    try {
      const id = parseInt(req.params.id, 10);
      let response;
      const accommodationFound = await AccommodationRepository.findById(id);

      if (!accommodationFound) {
        response = new Response(res, 404, 'No Accommodation found');
        return response.sendErrorMessage();
      }

      const approvedAccommodation = await AccommodationRepository.accommodationApprove({ id }, { status: 'Approved' });
      response = new Response(res, 200, 'Accommodation is sucessfully approved', approvedAccommodation[1]);
      return response.sendSuccessResponse();
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
  }

  /**
   * @description This helps to find  all accommodations
   * @param  {object} req - The accommodation object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async getAllAccommodation(req, res) {
    let accommodations;
    let response;
    try {
      const { userData } = req;
      const isRequester = await AuthUtils.isRequester(userData);
      const isSuperAdmin = await AuthUtils.isSuperAdmin(userData);
      const isHost = await AuthUtils.isHost(userData);

      if (isRequester) accommodations = await AccommodationRepository.findAll({ status: 'Approved' });

      if (isSuperAdmin) accommodations = await AccommodationRepository.findAll();

      if (isHost) accommodations = await AccommodationRepository.findAll({ user_id: userData.id });

      if (accommodations.length === 0) {
        response = new Response(res, 404, 'No Accommodations found');
        return response.sendErrorMessage();
      }

      response = new Response(res, 200, 'Accommodations info', accommodations);
      return response.sendSuccessResponse();
    } catch (error) {
      response = new Response(res, 500, error.message);
      return response.sendErrorMessage();
    }
  }

  /**
   * @description This helps to find accommodation by id
   * @param  {object} req - The accommodation object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async getSpecificAccommodation(req, res) {
    let accommodation;
    let response;
    try {
      const { userData } = req;
      const id = parseInt(req.params.id, 10);
      const isRequester = await AuthUtils.isRequester(userData);

      if (isRequester) accommodation = await AccommodationRepository.findOne({ id, status: 'Approved' });

      accommodation = await AccommodationRepository.findById(id);

      if (!accommodation) {
        response = new Response(res, 404, 'No Accommodation found');
        return response.sendErrorMessage();
      }

      response = new Response(res, 200, 'Accommodation info', accommodation);
      return response.sendSuccessResponse();
    } catch (error) {
      response = new Response(res, 500, error);
      return response.sendErrorMessage();
    }
  }


  /** Function to he;p a user with a trip request book a room in an accommodation
   * @param {object} req the request sent to the server
   * @param {object} res the response returned
   * @param {object} keyword to be searched for
   * @returns {object} found data
   */
  static async bookRoom(req, res) {
    let response;
    try {
      const changeToBooked = await Room.update({
        booked: true
      }, {
        where: {
          accommodation_id: req.value.accommodation_id,
          id: req.value.room_id
        }
      });
      if (changeToBooked[0] !== 0) {
        const { dataValues } = await Booking.create({
          checkin: req.value.checkin,
          checkout: req.value.checkout,
          accommodation_id: req.value.accommodation_id,
          room_id: req.value.room_id,
          user_id: req.userData.id,
          trip_id: req.value.trip_id
        });
        response = new Response(res, 201, 'Your room was booked', dataValues);
        return response.sendSuccessResponse();
      }
    } catch (error) {
      response = new Response(res, 500, `Internal Server Error: ${error}`);
      return response.sendErrorMessage();
    }
  }
}
export default AccommodationController;
