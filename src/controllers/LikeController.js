import { onSuccess, onError } from '../utils/response';
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
        return onError(res, 404, 'accommodation not found');
      }
      alreadyLiked = await LikeService.checkLikes({
        user_id: userData.id,
        accommodation_id: AccommodationId
      });
      if (alreadyLiked.length > 0) {
        await LikeService.unLike({ user_id: userData.id, accommodation_id: AccommodationId });
        return onSuccess(res, 201, `You have unliked ${accommodation.name}`);
      }
      const addedLike = await LikeService.Like({
        user_id: userData.id,
        accommodation_id: AccommodationId,
      }, {
        fields: ['user_id', 'accommodation_id']
      });

      if (addedLike) {
        return onSuccess(res, 201, `You have liked ${accommodation.name}`);
      }
    } catch (err) {
      return onError(res, 500, err || 'Internal server error');
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
        return onError(res, 404, 'accommodation not found');
      }
      Likes = await LikeService.accommodationLikes(AccommodationId);
      if (!Likes) {
        return onError(res, 404, 'Likes not found for this accommodation');
      }
      return onSuccess(res, 200, `${accommodation.name} Likes sucessfully fetched `, { likes: Likes });
    } catch (err) {
      return onError(res, 500, err || 'Internal server error');
    }
  }
}
export default LikeController;
