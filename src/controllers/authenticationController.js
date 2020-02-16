import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import hash from '../utils/hash';
import models from '../models';
import redisClient from '../database/redis.database';
import Response from '../utils/response';
import DbErrorHandler from '../utils/dbErrorHandler';
import SendMailer from '../services/send.email';
import UserRepository from '../repositories/userRepository';

dotenv.config();

const { User } = models;
const { hashPassword, decryptPassword } = hash;

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
        email: user.email,
        role: user.role
      };
      const token = jwt.sign(newUser, process.env.KEY);
      const data = {
        user: {
          email: user.email,
          userName: user.user_name,
        },
        token
      };
      const emailView = SendMailer.confirm(req, token, userName);
      SendMailer.sendEmail(email, 'Account Verification', emailView);

      const response = new Response(res, 201, 'User sucessfully registered', data);
      response.sendSuccessResponse();
    } catch (error) {
      DbErrorHandler.handleSignupError(res, error);
    }
  }

  /**
   * @description This helps an existing user to login
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async Login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email
        }
      });
      if (!user) {
        return res.status(404).json({ status: 404, message: 'Email or password does not exists' });
      }
      if (user.isVerified === false) {
        return res.status(404).json({ status: 404, message: 'Account is yet not verified, Check your email address for account Verification' });
      }
      const decryptedPassword = await decryptPassword(password, user.password);
      if (!decryptedPassword) {
        return res.status(404).json({ status: 404, message: 'Email or password does not exists' });
      }
      const newUser = {
        id: user.id,
        email: user.email,
        role: user.role
      };
      const token = jwt.sign(newUser, process.env.KEY);
      return res.status(200).json({ status: 200, message: ` Hey ${user.user_name}! you are  signed in Successfully`, data: { token } });
    } catch (err) {
      return res.status(500).json({ error: 'internal server error', err });
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
      const user = await UserRepository.update({ email }, { role });

      if (user[0] === 0) {
        const response = new Response(res, 404, 'User not found');
        return response.sendErrorMessage();
      }
      const newUser = {
        email: user[1][0].email,
        userName: user[1][0].user_name,
        role: user[1][0].role
      };
      const response = new Response(res, 200, 'User role updated successfully', { user: newUser });
      return response.sendSuccessResponse();
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
  }
}
