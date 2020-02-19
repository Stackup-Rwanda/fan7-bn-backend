import models from '../models';
import userRepository from '../repositories/userRepository';
import accommodationRepo from '../repositories/accommodation.repository';
import ratingRepository from '../repositories/rating.repository';
import { onError, onSuccess } from '../utils/response';

const { Rating } = models;
class RatingController {
  static async addRate(req, res) {
    const accommodationId = req.params.id;
    const userId = req.userData.id;
    const rating = Math.round(req.body.rating);
    const foundUser = await userRepository.findById(userId);
    const foundAccommodation = await accommodationRepo.findById(accommodationId);

    if (foundUser.isVerified === true) {
      const foundRating = await Rating.findOne({
        where: {
          user_id: userId,
          accommodation_id: accommodationId
        }
      });
      if (!foundAccommodation) {
        return onError(res, 404, 'Accomodation not found');
      }
      if (!foundRating) {
        const addedRating = await ratingRepository.addRate({
          user_id: foundUser.id,
          accommodation_id: foundAccommodation.id,
          ratings: rating
        }, {
          fields: ['user_id', 'accommodation_id', 'ratings']
        });
        const avg = await (ratingRepository.findAll({
          attributes: ['accommodation_id', [Rating.sequelize.fn('AVG', Rating.sequelize.col('ratings')), 'ratingAvg']],
          group: ['accommodation_id'],
          order: [[Rating.sequelize.fn('AVG', Rating.sequelize.col('ratings')), 'DESC']]
        })
        );

        if (!addedRating) {
          return onError(res, 500, 'Internal Server Error');
        }
        const [{ dataValues }] = avg;
        const { ratingAvg } = dataValues;
        const data = {
          accommodationId: dataValues.accommodation_id,
          ratingAvg: parseFloat(ratingAvg)
        };
        return onSuccess(res, 201, 'You have successfully rated a centre', data);
      }
      const updateRating = await Rating.update(
        {
          ratings: rating
        },
        {
          where: {
            accommodation_id: accommodationId
          },
          returning: false
        }
      );
      const avg = await (ratingRepository.findAll({
        attributes: ['accommodation_id', [Rating.sequelize.fn('AVG', Rating.sequelize.col('ratings')), 'ratingAvg']],
        group: ['accommodation_id'],
        order: [[Rating.sequelize.fn('AVG', Rating.sequelize.col('ratings')), 'DESC']]
      })
      );
      if (updateRating) {
        const [{ dataValues }] = avg;
        const { ratingAvg } = dataValues;
        const data = {
          accommodationId: dataValues.accommodation_id,
          ratingAvg: parseFloat(ratingAvg)
        };
        return onSuccess(res, 201, 'You have successfully updated your rate', data);
      }
      return onError(res, 500, 'Internal Server Error');
    }
    return onError(res, 400, 'Sorry, you can not rate! your account is not verified');
  }
}
export default RatingController;
