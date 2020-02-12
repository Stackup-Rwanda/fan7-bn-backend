import Joi from '@hapi/joi';

/**
 * @description FeedbackSchema class validates user data
*/
class FeedbackSchema {
  /**
   * @static
   * @param {obj} data
   * @returns {obj} returns schema object
  */

  static createSchema(data) {
    const schema = Joi.object({
      feedback: Joi
        .string()
        .trim()
        .min(10)
        .max(1000)
        .messages({
          'string.base': 'feedback must be string',
          'string.min': 'feedback length must be at least {{#limit}} characters long',
          'string.max': 'feedback length must be at least {{#limit}} characters long',
          'string.any': 'A feedback field can not be empty'
        })
        .required()
    });
    return schema.validate(data);
  }
}

export default FeedbackSchema;
