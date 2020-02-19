import models from '../models';
import userRepository from '../repositories/userRepository';
import accommodationRepo from '../repositories/accommodation.repository';
import ratingRepository from '../repositories/rating.repository';

const { Rating } = models;
class RatingController {
  static async addRate(req, res) {
    const accommodationId = req.params.id;
    const userId = req.userData.id;
    const { rating } = req.body;
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
        return res.status(404).json({
          status: 404,
          error: 'Accomodation not found',
        });
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
          attributes: ['accommodation_id', [Rating.sequelize.fn('AVG',
            Rating.sequelize.col('ratings')), 'ratingAvg']],
          group: ['accommodation_id'],
          order: [[Rating.sequelize.fn('AVG', Rating.sequelize.col('ratings')), 'DESC']]
        }));

        // avg.ratingAvg.toFixed(2);
        // const average = avg.map(({dataValues}) => {
        //     console.log(Math.round(dataValues.ratingAvg));

        // });
        if (!addedRating) {
          return res.status(500).json({
            status: 500,
            error: 'Internal Server Error'
          });
        }
        return res.status(200).json({
          status: 200,
          message: 'You have successfully rated a centre',
          data: avg,
        });
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
        attributes: ['accommodation_id', [Rating.sequelize.fn('AVG',
          Rating.sequelize.col('ratings')), 'ratingAvg']],
        group: ['accommodation_id'],
        order: [[Rating.sequelize.fn('AVG', Rating.sequelize.col('ratings')), 'DESC']]
      }));
      if (updateRating) {
        return res.status(200).json({
          status: 200,
          message: 'You have successfully updated your rate',
          data: avg,
        });
      }
      return res.status(500).json({
        status: 500,
        error: 'Internal Server Error'
      });
    }
    return res.status(400).json({
      status: 400,
      error: 'Sorry, you can not rate! your account is not verified',
    });
  }
}
export default RatingController;
