import Joi from '@hapi/joi';

class AccommodationSchema {
  static createSchema(data) {
    const schema = Joi.object().keys({
      name: Joi.string()
        .required()
        .messages({
          'string.base': 'name must be string',
          'any.required': 'name is required',
          'string.empty': 'name is not allowed to be empty'
        }),
      geoLocation: Joi.string()
        .required()
        .pattern(/^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/)
        .messages({
          'string.base': 'geolocation must be a string',
          'any.required': 'geolocation is required',
          'string.pattern.base': 'geolocation must be (lat, long) and lat must not be > 90 and long must not be > 180',
        }),
      description: Joi.string()
        .required()
        .messages({
          'string.base': 'description must be string',
        }),
      address: Joi.string()
        .regex(/^[a-zA-Z]+,\s[a-zA-Z]+$/)
        .required()
        .min(2)
        .messages({
          'any.regex': '"address" must be in Country, City format'
        }),
      rooms: Joi
        .number()
        .required()
        .messages({
          'number.base': 'rooms must be a number',
          'any.required': '"rooms" is reguired'

        }),
      services: Joi.array().items(Joi.string())
        .required()
        .messages({
          'array.base': 'services must be an array',
          'any.required': 'services is required',
        }),
      amenities: Joi.array().items(Joi.string())
        .required()
        .messages({
          'array.base': 'amenities must be an array',
          'any.required': 'amenities is required',
        }),

    });

    return schema.validate(data);
  }

  static accommodationParam(data) {
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
        }),
    });
    return schema.validate(data);
  }
}
export default AccommodationSchema;
