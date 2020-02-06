import 'dotenv';
import Response from '../utils/response';
import UserSchema from '../modules/userSchema';
import validator from '../utils/validator';
import redisClient from '../database/redis.database';
import AuthUtils from '../utils/auth.utils';
import userRepository from '../repositories/userRepository';

const { trimmer } = validator;

/**
 * @description AuthMiddleware checks if the token was loggedout or not
 */
class AuthMiddleware {
  /**
   *
   * @param { obj } req
   * @param { obj } res
   * @param { function } next
   * @returns { * } null
   */
  static async verifyToken(req, res, next) {
    try {
      const token = req.headers.token.split(' ')[1];
      const payload = AuthUtils.jwtVerify(token);
      redisClient.get('token', (err, userToken) => {
        const user = userRepository.findByEmail(payload.email);
        if (!user) {
          return res.status(400).json({ status: 400, error: 'invalid token' });
        }
        if (token === userToken) {
          return res.status(401).json({ status: 401, error: 'Please login required' });
        }

        req.userData = payload;
        next();
      });
    } catch (ex) {
      return res.status(400).json({ status: 400, error: 'invalid token' });
    }
  }

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
      const isEmailExists = await AuthUtils.emailExists(userData);

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
      const response = new Response(res, 500, 'Internal Server Error');
      return response.sendErrorMessage();
    }
  }

  /**
   * @description This helps validate new role info
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @param  {object} next - forwards request to the next middleware function
   * @returns  {object} The response object
   */
  static async userRole(req, res, next) {
    const { id } = req.userData;
    const { email, role } = req.body;
    const user = { email, role };
    const { error, value } = UserSchema.assignRole(user);

    if (error) {
      const response = new Response(res, 422, error.details[0].message);
      response.sendErrorMessage();
    } else {
      const superAdmin = await AuthUtils.superAdminExists(id);

      if (!superAdmin) {
        const response = new Response(res, 401, 'Your credintials are invalid');
        return response.sendErrorMessage();
      }
      if (superAdmin.role !== 'super-administrator') {
        const response = new Response(
          res,
          405,
          'You have no rights over this endpoint'
        );
        return response.sendErrorMessage();
      }
      req.value = value;
      next();
    }
  }

  static async autoFill(req, res, next) {
    const { dataValues } = await userRepository.findByUserId(req.userData.id);
    const data = await userRepository.findRequestByUserId(dataValues.id);
    if (!data) return next();
    if (dataValues.rememberMe !== false) {
      const {
        passportName, passportNumber, gender, role, dob
      } = data.dataValues;
      req.body = {
        ...req.body, passportName, passportNumber, gender, role, dob

      };
      return next();
    }
    next();
  }

  static async rememberMe(req, res) {
    const check = req.body.rememberMe;
    if (check === true) await userRepository.update({ id: req.userData.id }, { rememberMe: true });
    if (check === false) {
      await userRepository.update({ id: req.userData.id }, { rememberMe: false });
    }
  }
}

export default AuthMiddleware;
