import Joi from '@hapi/joi';

/**
 * @description BookingSchema class validates user data
 */
class BookingSchema {
  /**
   * @static
   * @param {obj} data
   * @returns {obj} returns schema object
   */

  static bookSchema(data) {
    const schema = Joi.object({
      trip_id: Joi.number()
        .integer()
        .required()
        .messages({
          'number.base': 'trip_ id must be an integer',
          'number.required': 'trip_ id is required'
        }),
      accommodation_id: Joi.number()
        .integer()
        .required()
        .messages({
          'number.base': 'accommodation_id must be an integer',
          'number.required': 'accommodation_id is required'
        }),
      room_id: Joi.number()
        .integer()
        .required()
        .messages({
          'number.base': 'trip_ id must be an integer must be an integer',
          'number.required': 'trip_ id is required'
        }),
      checkin: Joi.date()
        .min(Date.now())
        .required()
        .messages({
          'date.base': 'checkin time must be a string with format of yyyy-mm-dd',
          'date.min':
            'checkin time must have format of yyyy-mm-dd and can not be in the past'
        }),
      checkout: Joi.date()
        .min(Date.now())
        .required()
        .messages({
          'date.base': 'checkout time must be a string with format of yyyy-mm-dd',
          'date.min':
            'checkout time must have format of yyyy-mm-dd and can not be in the past'
        })
    });
    return schema.validate(data);
  }

  static param(data) {
    const schema = Joi.object({
      id: Joi.number()
        .integer()
        .positive()
        .min(1)
        .messages({
          'number.base': 'Parameter id must be a number',
          'string.min': 'Parameter id  length must be at least {{#limit}} characters long',
          'number.integer': 'Parameter id  must be an integer',
          'number.positive': 'Parameter id  must be a positive number',
          'number.unsafe': 'Parameter id  must be a safe number',
          'any.required': 'Parameter id  is required',
        })
    });
    return schema.validate(data);
  }
}

export default BookingSchema;
