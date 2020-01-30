import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../models';
import hashPassword from '../utils/hash';
import redisClient from '../database/redis.database';
import Response from '../utils/response';
import DbErrorHandler from '../utils/dbErrorHandler';

dotenv.config();

const { User } = models;

export default class AuthanticationController {
  /**
   * @description This helps a new User to create credentials
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async register(req, res) {
    try {
      const {
        firstName,
        lastName,
        userName,
        password,
        email
      } = req.body;
      const user = await User.create(
        {
          user_name: userName,
          first_name: firstName,
          last_name: lastName,
          email,
          password: await hashPassword(password)
        },
        {
          fields: [
            'user_name',
            'email',
            'password',
            'first_name',
            'last_name',
            'role'
          ]
        }
      );
      const newUser = {
        id: user.id,
        email: user.email
      };
      const token = jwt.sign(newUser, process.env.KEY);
      const data = {
        user: {
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          userName: user.user_name,
        },
        token
      };
      const response = new Response(res, 201, data);
      response.sendSuccessResponse();
    } catch (error) {
      DbErrorHandler.handleSignupError(res, error);
    }
  }

  /**
   * @description contoller function that logs a user out
   * @param {object} req - request object
   * @param {object} res - response object
   * @param {object} next - middleware object
   * @returns {object} user - Logged in user
   */
  static async logout(req, res) {
    // const { email } = req.user;
    try {
      const token = req.headers.token.split(' ')[1] || req.params.token;
      redisClient.set('token', token);
      return res.status(200).json({
        status: 200,
        message: 'You have logged out'
      });
    } catch (error) {
      res.status(403).json({ status: 403, error: 'provide token!' });
    }
  }

  /**
 *
 * @param { obj } req
 * @param { obj } res
 * @returns { * } null
 */
  static async loggedOut(req, res) {
    res.status(200).json({ status: 200, message: 'Still Loggedin' });
  }

  /**
   * @description This helps a super administrator to change users role
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async assignRole(req, res) {
    const { email, role } = req.value;
    try {
      const user = await User.update(
        {
          role
        },
        {
          where: {
            email
          },
          returning: true
        }
      );
      if (user[0] === 0) {
        const response = new Response(res, 404, 'User not found');
        response.sendErrorMessage();
      }
      const response = new Response(res, 200, user[1][0]);
      response.sendSuccessResponse();
    } catch (error) {
      DbErrorHandler.handleSignupError(res, error);
    }
  }
}
