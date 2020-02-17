import 'dotenv';
import Response from '../utils/response';
import AccommodationSchema from '../modules/accommodation.schema';
import AuthUtils from '../utils/auth.utils';
import ImageUploader from '../utils/imageUploader.util';

class AccommodationMiddleware {
  static async validate(req, res, next) {
    let response;
    try {
      const { userData } = req;
      const accommodationData = req.body;
      const { error } = AccommodationSchema.createSchema(accommodationData);
      const verified = await AuthUtils.isVerified(userData);

      if (!verified) {
        response = new Response(res, 400, 'Your account is not yet verified');
        return response.sendErrorMessage();
      }

      if (error) {
        response = new Response(res, 422, error.message);
        return response.sendErrorMessage();
      }

      if (req.files && req.files.image) {
        const imageUrl = await ImageUploader.uploader(req.files.image);
        if (!imageUrl) {
          response = new Response(res, 415, 'Please Upload a valid image');
          return response.sendErrorMessage();
        }

        accommodationData.image = [imageUrl];
      }

      req.accommodationData = accommodationData;
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
      const isHost = await AuthUtils.isHost(userData);
      if (!isHost) {
        const response = new Response(res, 403, 'You have no rights over this endpoint');
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
