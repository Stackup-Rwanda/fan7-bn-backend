import UserRepository from '../repositories/userRepository';
import Response from '../utils/response';
import pagination from '../utils/pagination.utils';
import DbErrorHandler from '../utils/dbErrorHandler';

class UserController {
  /**
       *
       * @param {req} req
       * @param {res} res
       * @returns {obj} returns a response
       */
  static async getAllUsers(req, res) {
    let response;
    try {
      const { limit, offset } = pagination(req.query);
      const allUsers = await UserRepository.findAll(limit, offset);

      if (allUsers.length === 0) {
        response = new Response(res, 404, 'No users data found');
        return response.sendErrorMessage();
      }

      const users = allUsers.map(({ dataValues }) => {
        const { password, ...result } = dataValues;

        return result;
      });


      response = new Response(res, 200, 'All users', users);
      return response.sendSuccessResponse();
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
  }

  /**
       *
       * @param {req} req
       * @param {res} res
       * @returns {obj} returns a response
       */
  static async getUser(req, res) {
    let response;

    try {
      const id = parseInt(req.params.id, 10);
      const userData = await UserRepository.findById(id);

      if (!userData) {
        response = new Response(res, 404, 'User not found');
        return response.sendErrorMessage();
      }

      const { dataValues } = userData;
      const { password, ...user } = dataValues;

      response = new Response(res, 200, 'User data', user);
      return response.sendSuccessResponse();
    } catch (error) {
      return DbErrorHandler.handleSignupError(res, error);
    }
  }
}

export default UserController;
