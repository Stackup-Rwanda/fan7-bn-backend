import Response from '../utils/response';
import UserSchema from '../modules/userSchema';
import validator from '../utils/validator';
import AuthUtils from '../utils/auth.utils';

const { trimmer } = validator;
/**
 * @description AuthMiddleware class handles user data validation
*/
class AuthMiddleware {
  /**
   * @param {req} req object
   * @param {res} res object
   * @param {next} next forwards request to the next middleware function
   * @returns {obj} returns a response object
  */
  static async signup(req, res, next) {
    const userData = trimmer(req.body);
    const { error } = UserSchema.signup(userData);
    try {
      const isEmailExists = await AuthUtils.emailExists(req.body);

      if (isEmailExists) {
        const response = new Response(res, 409, 'Email already used');
        return response.sendErrorMessage();
      }

      if (error) {
        const response = new Response(res, 422, error.message);
        return response.sendErrorMessage();
      }

      return next();
    } catch (err) {
      const response = new Response(res, 500, err);
      return response.sendErrorMessage();
    }
  }
}

export default AuthMiddleware;
