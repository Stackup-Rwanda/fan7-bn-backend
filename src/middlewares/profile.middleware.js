import 'dotenv';
import Response from '../utils/response';
import UserSchema from '../modules/userSchema';
import validator from '../utils/validator';
import AuthUtils from '../utils/auth.utils';

const { trimmer } = validator;

/**
 * @description AuthMiddleware checks if the token was loggedout or not
 */
class ProfileMiddleware {
  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
  */
  static async validate(req, res, next) {
    const { userData } = req;
    const profileData = trimmer(req.body);
    const { error } = UserSchema.profile(profileData);
    try {
      const isEmailExists = await AuthUtils.emailExists(profileData);
      const verified = await AuthUtils.isVerified(userData);

      if (isEmailExists && userData.email !== profileData.email) {
        const response = new Response(res, 409, 'Email already used');
        return response.sendErrorMessage();
      }

      if (!verified) {
        const response = new Response(res, 400, 'Your account is not yet verified');
        return response.sendErrorMessage();
      }

      if (error) {
        const response = new Response(res, 422, error.message);
        return response.sendErrorMessage();
      }

      req.profileData = profileData;
      return next();
    } catch (err) {
      const response = new Response(res, 500, err);
      return response.sendErrorMessage();
    }
  }
}

export default ProfileMiddleware;
