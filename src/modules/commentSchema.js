import Joi from '@hapi/joi';

/**
 * @description CommentSchema class validates user data
*/
class CommentSchema {
  /**
   * @static
   * @param {obj} data
   * @returns {obj} returns schema object
  */

  static creatSchema(data) {
    const schema = Joi.object({
      comment: Joi
        .string()
        .trim()
        .min(10)
        .max(1000)
        .messages({
          'string.base': 'comment must be string',
          'string.min': 'Comment length must be at least {{#limit}} characters long',
          'string.max': 'comment length must be at least {{#limit}} characters long',
          'string.any': 'A comment field can not be empty'
        })
        .required()
    });
    return schema.validate(data);
  }
}

export default CommentSchema;
