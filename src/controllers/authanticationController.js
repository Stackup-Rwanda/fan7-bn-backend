import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Validator from '../middlewares/loginValidation';
import hash from '../utils/hash';
import models from '../models';
import redisClient from '../database/redis.database';
import Response, { onError, onSuccess } from '../utils/response';
import DbErrorHandler from '../utils/dbErrorHandler';

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
      return res.status(500).json({ error: 'internal server error' });
    }
  }
  // Login

  static async Login(req, res) {
    let validatorMessage;
    try {
      const { email, password } = req.body;
      const Validate = Validator.schemaSignIn(req.body);
      if (Validate.error) {
        validatorMessage = Validate.error.details[0].message;
        validatorMessage = validatorMessage.replace(/"/g, '');
        return res.status(400).send({ status: 400, message: validatorMessage });
      }
      const userExists = await User.findOne({
        where: {
          email
        }
      });
      if (!userExists) {
        return res.status(404).json({ status: 404, message: 'Email or password does not exists' });
      }
      const decryptedPassword = await decryptPassword(password, userExists.password);
      if (!decryptedPassword) {
        return res.status(404).json({ status: 404, message: 'Email or password does not exists' });
      }
      const newUser = {
        id: userExists.id,
        email: userExists.email
      };
      const token = jwt.sign(newUser, process.env.KEY);
      return res.status(200).json({ status: 200, message: ` Hey ${userExists.user_name}! you are  signed in Successfully on ${Validator.createdDate}`, data: { token } });
    } catch (err) {
      return res.status(500).json({ error: 'internal server error', err });
    }
  }

  /**
   * @description Find user in database
   * @param  {object} profile - The user information
   * @returns  {object} The response object
   */
  static async findSocialUser(profile) {
    try {
      const selector = { where: { social_id: profile.id, provider: profile.provider } };
      const userData = await User.findOne(selector);
      return userData;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  /**
   * @description This add new user into database
   * @param  {object} profile - The user information
   * @returns  {object} The response object
   */
  static async socialCreate(profile) {
    try {
      if (profile.provider === 'facebook') {
        return await User.create({
          user_name: profile.displayName,
          social_id: profile.id,
          provider: profile.provider,
          role: 'requester',
        }, { fields: ['user_name', 'social_id', 'provider', 'role'] });
      }
      const [{ value }] = profile.emails;
      const { familyName, givenName } = profile.name;
      const userData = await User.create({
        user_name: profile.displayName,
        first_name: familyName,
        last_name: givenName,
        email: value,
        social_id: profile.id,
        provider: profile.provider,
        role: 'requester',
      }, { fields: ['user_name', 'first_name', 'last_name', 'email', 'social_id', 'provider', 'role'] });
      return userData;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  /**
   * @description Handle or user activities
   * @param  {object} req - The request object
   * @param  {object} res - The response object
   * @returns  {object} The response object
   */
  static async socialLogin(req, res) {
    try {
      const payload = {
        id: req.user.id,
        username: req.user.displayName,
        provider: req.user.provider
      };
      const token = jwt.sign(payload, process.env.KEY);
      const user = await AuthanticationController.findSocialUser(req.user);
      if (user) return onSuccess(res, 200, `${user.user_name}, You are successful logged in`, token);
      const { dataValues } = await AuthanticationController.socialCreate(req.user);
      if (dataValues) return onSuccess(res, 200, `${dataValues.user_name}, You are successful logged in`, token);
    } catch (ex) {
      return onError(res, 500, 'Internal Server Error');
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
}
