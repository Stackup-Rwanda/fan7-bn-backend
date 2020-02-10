/* eslint-disable class-methods-use-this */
import Response from '../utils/response';
import LikeService from '../repositories/LikeRepository';

class LikeController {
  /**
   * like or unlike accomodation facility
   * @param {object} req accommodation
   * @param {object} res response
   * @returns {object} response object
   */
  static async LikeOrUnlike(req, res) {
    let accommodation;
    let alreadyLiked;
    try {
      const { userData } = req;
      const AccommodationId = Number(req.params.id);

      accommodation = await LikeService.checkAccommodation(AccommodationId);
      if (!accommodation) {
        const response = new Response(res, 404, 'accommodation not found');
        return response.sendErrorMessage();
      }
      alreadyLiked = await LikeService.checkLikes({
        user_id: userData.id,
        accommodation_id: AccommodationId
      });
      if (alreadyLiked.length > 0) {
        await LikeService.unLike({ user_id: userData.id, accommodation_id: AccommodationId });
        const response = new Response(res, 201, `You have unliked ${accommodation.name}`);
        return response.sendSuccessMessage();
      }
      const addedLike = await LikeService.Like({
        user_id: userData.id,
        accommodation_id: AccommodationId,
      }, {
        fields: ['user_id', 'accommodation_id']
      });

      if (addedLike) {
        const response = new Response(res, 201, `You have liked ${accommodation.name}`);
        return response.sendSuccessMessage();
      }
    } catch (err) {
      const response = new Response(res, 500, err || 'Internal server error');
      return response.sendErrorMessage();
    }
  }

  /**
   * @description fetch all likes of a certain accommodation
   * @param {object} req accommodation
   * @param {object} res response
   * @returns {object} response object
   */

  static async countAccommodationLikes(req, res) {
    let accommodation;
    let Likes;
    try {
      const AccommodationId = Number(req.params.id);

      accommodation = await LikeService.checkAccommodation(AccommodationId);
      if (!accommodation) {
        const response = new Response(res, 404, 'accommodation not found');
        return response.sendErrorMessage();
      }
      Likes = await LikeService.accommodationLikes(AccommodationId);
      if (!Likes) {
        const response = new Response(res, 404, 'Likes not found for this accommodation');
        return response.sendErrorMessage();
      }
      const response = new Response(res, 200, `${accommodation.name} Likes sucessfully fetched `, { likes: Likes });
      response.sendSuccessResponse();
    } catch (err) {
      const response = new Response(res, 500, err || 'Internal server error');
      return response.sendErrorMessage();
    }
  }
}
export default LikeController;
