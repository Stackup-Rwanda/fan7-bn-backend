import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../models';
import hashPassword from '../utils/hash';
import Response, { onError, onSuccess } from '../utils/response';
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
   * @description This helps a new User to create credentials
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
   * @description This helps a new User to create credentials
   * @param  {object} profile - The user information
   * @returns  {object} The response object
   */
  static async socialCreate(profile) {
    try {
      let info, fields;
      if (profile.provider === 'facebook') {
        info = {
          user_name: profile.displayName,
          social_id: profile.id,
          provider: profile.provider,
          role: 'requester',
        };
        fields = ['user_name', 'social_id', 'provider', 'role'];
        return await User.create(info, { fields });
      }
      const [{ value }] = profile.emails;
      const { familyName, givenName } = profile.name;
      info = {
        user_name: profile.displayName,
        first_name: familyName,
        last_name: givenName,
        email: value,
        social_id: profile.id,
        provider: profile.provider,
        role: 'requester',
      };
      fields = ['user_name', 'first_name', 'last_name', 'email', 'social_id', 'provider', 'role'];
      const userData = await User.create(info, { fields });
      return userData;
    } catch (ex) {
      throw new Error(ex);
    }
  }

  /**
   * @description This helps a new User to create credentials
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
}
