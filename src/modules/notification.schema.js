import Joi from '@hapi/joi';
/**
 * @description NotificationSchema class validates user data
*/
class NotificationSchema {
  /**
   * @static
   * @param {obj} data
   * @returns {obj} returns schema object
  */
  static notificationParam(data) {
    const schema = Joi.object({
      id: Joi.number()
        .integer()
        .positive()
        .min(1)
        .messages({
          'number.base': 'Parameter id must be a number',
          'string.min': 'Parameter id length must be at least {{#limit}} characters long',
          'number.integer': 'Parameter id must be an integer',
          'number.positive': 'Parameter id must be a positive number',
          'number.unsafe': 'Parameter id must be a safe number',
          'any.required': 'Parameter id is required',
        }),
    });
    return schema.validate(data);
  }

  /**
   * @static
   * @param {obj} data
   * @returns {obj} returns schema object
  */
  static changePreference(data) {
    const schema = Joi.object({
      emailNotification: Joi.boolean().required()
        .messages({
          'boolean.base': 'emailNotification must be a boolean',
          'any.required': 'emailNotification is required'
        }),
    });
    return schema.validate(data);
  }
}
export default NotificationSchema;
