import Joi from '@hapi/joi';

/**
 * @description RatingSchema validates data entered by the user
*/
class RatingSchema {
  /**
   * @static
   * @param {obj} data
   * @returns {obj} returns schema object
  */
  static creatSchema(data) {
    const schema = Joi.object({
      rating: Joi
        .number()
        .min(1)
        .max(5)
        .messages({
          'number.min': 'Rating must be greater than zero',
          'number.max': 'Rating must be less than or equal to five'
        })
        .required()
    });
    return schema.validate(data);
  }
}

export default RatingSchema;
