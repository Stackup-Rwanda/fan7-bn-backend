import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import models from '../models';
import hashPassword from '../utils/hash';
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
