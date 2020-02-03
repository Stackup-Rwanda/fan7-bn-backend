import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../models';
import { onError, onSuccess } from '../utils/response';

dotenv.config();

const { User } = models;
export default class SocialController {
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
          isVerified: true
        }, { fields: ['user_name', 'social_id', 'provider', 'role', 'isVerified'] });
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
        isVerified: true
      }, { fields: ['user_name', 'first_name', 'last_name', 'email', 'social_id', 'provider', 'role', 'isVerified'] });
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
      const user = await SocialController.findSocialUser(req.user);
      if (user) return onSuccess(res, 200, `${user.user_name}, You are successful logged in`, token);
      const { dataValues } = await SocialController.socialCreate(req.user);
      if (dataValues) return onSuccess(res, 200, `${dataValues.user_name}, You are successful logged in`, token);
    } catch (ex) {
      return onError(res, 500, 'Internal Server Error');
    }
  }
}
