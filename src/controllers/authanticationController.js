import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Validator from '../middleware/loginValidation';
import { hashPassword, decryptPassword } from '../utils/hash';
import models from '../models';
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
  // Login

  static async Login(req, res) {
    try {
      const { email, password } = req.body;
      const inValidate = Validator.schemaSignIn(req.body);
      if (inValidate.error) {
        const mess = inValidate.error.details[0].message;
        const messUser = mess.replace(/\"/g, '');
        res.status(400).send({ status: 400, message: messUser });
      }
      if (!inValidate.error) {
        const userExists = await User.findOne({
          where: {
            email
          }
        });
        if (!userExists) {
          res.status(404).json({ status: 404, message: 'Email or password does not exists' });
        }
        const decryptedPassword = await decryptPassword(password, userExists.password);
        if (!decryptedPassword) {
          res.status(404).json({ status: 404, message: `${userExists.email}! this password does not exists` });
        }
        const newUser = {
          id: userExists.id,
          email: userExists.email
        };
        const token = jwt.sign(newUser, process.env.KEY);
        res.status(200).json({ status: 200, message: ` Hey ${userExists.email}! you are  signed in Successfully on ${Validator.created}`, data: { token } });
      }
    } catch (err) {
      res.status(500).json({ error: 'internal server error', err });
    }
  }
}
