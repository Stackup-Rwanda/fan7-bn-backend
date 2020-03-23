import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../models';
import { onError } from '../utils/response';

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
      const user = await SocialController.findSocialUser(req.user);
      const { value } = req.user.photos[0];
      if (user) {
        const payload1 = {
          id: user.dataValues.id,
          social_id: req.user.id,
          username: req.user.displayName,
          image: value,
          provider: req.user.provider
        };
        const token1 = jwt.sign(payload1, process.env.KEY);
        return res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token1}`);
      }
      const { dataValues } = await SocialController.socialCreate(req.user);
      if (dataValues) {
        const payload2 = {
          id: dataValues.id,
          social_id: req.user.id,
          username: req.user.displayName,
          image: value,
          provider: req.user.provider
        };
        const token2 = jwt.sign(payload2, process.env.KEY);
        return res.redirect(`${process.env.FRONTEND_URL}/dashboard?token=${token2}`);
      }
    } catch (ex) {
      return onError(res, 500, 'Internal Server Error');
    }
  }
}
