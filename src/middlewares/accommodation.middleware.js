import 'dotenv';
import Response from '../utils/response';
import AccommodationSchema from '../modules/accommodation.schema';
import AuthUtils from '../utils/auth.utils';

class AccommodationMiddleware {
  static async validate(req, res, next) {
    let response;
    try {
      const { userData } = req;
      const {
        name,
        address,
        description,
        geoLocation,
        services,
        amenities
      } = req.body;
      const accommodationData = {
        name,
        address,
        description,
        geo_location: geoLocation,
        services,
        amenities
      };
      const { error, value } = AccommodationSchema.createSchema(accommodationData);
      const verified = await AuthUtils.isVerified(userData);

      if (!verified) {
        response = new Response(res, 400, 'Your account is not yet verified');
        return response.sendErrorMessage();
      }

      if (error) {
        response = new Response(res, 422, error.message);
        return response.sendErrorMessage();
      }
      if (!req.files || !req.files.image) {
        response = new Response(res, 422, 'Image must be provided with key "image"');
        return response.sendErrorMessage();
      }
      req.accommodationData = value;
      return next();
    } catch (err) {
      response = new Response(res, 500, err);
      return response.sendErrorMessage();
    }
  }

  static async roomValidation(req, res, next) {
    let response;
    try {
      const { userData } = req;

      const accommodationId = req.params.accommodation_id;
      const {
        cost,
        type,
        roomNumber,
        area,
        totalBedrooms,
        amenities
      } = req.body;
      const roomData = {
        cost,
        type,
        area,
        room_number: roomNumber,
        total_bedrooms: totalBedrooms,
        amenities,
        accommodation_id: accommodationId,
        booked: false
      };
      const { error, value } = AccommodationSchema.createRoomSchema(roomData);
      if (error) {
        response = new Response(res, 422, error.message);
        return response.sendErrorMessage();
      }
      const { dataValues } = await AuthUtils.isHostSupplier(userData);
      if (!(dataValues.role === 'host-supplier' || dataValues.role === 'travel-administrator')) {
        response = new Response(res, 401, 'Only a host-supplier and travel admin can add rooms');
        return response.sendErrorMessage();
      }
      const isAccommodation = await AuthUtils.isAccommodation(value.accommodation_id);
      if (!isAccommodation) {
        response = new Response(res, 404, 'Accommodation not found');
        return response.sendErrorMessage();
      }
      if (isAccommodation.dataValues.user_id !== userData.id) {
        response = new Response(res, 401, 'You have no rights over the following accommodation');
        return response.sendErrorMessage();
      }
      if (isAccommodation.dataValues.status !== 'Approved') {
        response = new Response(res, 405, 'The following accommodation must be approved to have rooms');
        return response.sendErrorMessage();
      }
      const roomExist = await AuthUtils
        .roomExist({ accommodation_id: value.accommodation_id, room_number: value.room_number });
      if (roomExist) {
        response = new Response(res, 409, 'A similar room number exist already');
        return response.sendErrorMessage();
      }
      req.roomData = value;
      return next();
    } catch (err) {
      response = new Response(res, 500, err.message);
      return response.sendErrorMessage();
    }
  }

  /**
   * @description This helps to validate if user is a Host-supplier
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @param  {object} next - forwards request to the next middleware function
   * @returns  {object} The response object
   */
  static async isHost(req, res, next) {
    const { userData } = req;
    try {
      const { dataValues } = await AuthUtils.isHostSupplier(userData);
      if (!(dataValues.role === 'host-supplier' || dataValues.role === 'travel-administrator')) {
        const response = new Response(res, 401, 'You have no rights over this endpoint');
        return response.sendErrorMessage();
      }
      next();
    } catch (error) {
      const response = new Response(res, 500, error.message || 'Internal server error');
      return response.sendErrorMessage();
    }
  }

  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
  */
  static async param(req, res, next) {
    const { error } = AccommodationSchema.accommodationParam(req.params);
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
export default AccommodationMiddleware;
