import UserRepository from '../repositories/userRepository';
import Response from '../utils/response';

class UserProfile {
  /**
       *
       * @param {req} req
       * @param {res} res
       * @returns {obj} returns a response
       */
  static async getUser({ userData }, res) {
    let response;
    const { id } = userData;

    try {
      const search = await UserRepository.findByUserId(id);
      const { dataValues } = search;
      const { password, ...user } = dataValues;

      response = new Response(res, 200, 'User profile data', user);
      return response.sendSuccessResponse();
    } catch (error) {
      response = new Response(res, 500, error.message);
      return response.sendErrorMessage();
    }
  }

  /**
       *
       * @param {req} req
       * @param {res} res
       * @returns {obj} returns a response
       */
  static async updateUser(req, res) {
    let response;
    try {
      const { userData, profileData } = req;
      await UserRepository.update({ id: userData.id }, profileData);

      response = new Response(res, 200, 'User profile data', profileData);
      return response.sendSuccessResponse();
    } catch (error) {
      response = new Response(res, 500, error.message);
      return response.sendErrorMessage();
    }
  }
}

export default UserProfile;
