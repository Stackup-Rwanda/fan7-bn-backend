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
      geo_location: Joi.string()
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

  /**
 * @description This helps to validate if user is a Host-supplier
 * @param  {object} data - The object to validate
 * @param  {object} res - The response object
 * @param  {object} next - forwards request to the next middleware function
 * @returns  {object} The response object
 */
  static createRoomSchema(data) {
    const schema = Joi.object().keys({
      area: Joi.number()
        .min(3)
        .required()
        .messages({
          'number.base': '"area" must be a number',
          'number.required': '"area" is required'
        }),
      total_bedrooms: Joi.number()
        .min(1)
        .required()
        .messages({
          'number.base': '"totalBedrooms" must be a number',
          'number.required': '"totalBedrooms" is required'
        }),
      accommodation_id: Joi.number()
        .integer()
        .required()
        .messages({
          'number.base': '"accommodationNumber" must be an integer',
          'number.required': '"accommodationNumber" is required'
        }),
      type: Joi.string()
        .required()
        .messages({
          'string.base': 'Type of the room must be string',
        }),
      room_number: Joi.string()
        .trim()
        .regex(/^[0-9]{4}$/)
        .required()
        .messages({
          'number.base': '"roomNumber" must be a string of 4 number',
          'number.required': '"roomNumber" is required'
        }),
      amenities: Joi.array()
        .items(Joi.string())
        .required()
        .messages({
          'array.base': 'amenities must be an array',
          'any.required': 'amenities is required'
        }),
      cost: Joi.number()
        .min(0)
        .max(20000000000)
        .required()
        .messages({
          'number.base': '"cost" must be a number',
          'number.required': '"cost" is required'
        }),
      booked: Joi.boolean()
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
      accommodationId: Joi.number()
        .integer()
        .positive()
        .min(1)
        .messages({
          'number.base': 'Parameter accommodation id must be a number',
          'string.min': 'Parameter accommodation id length must be at least {{#limit}} characters long',
          'number.integer': 'Parameter accommodation id must be an integer',
          'number.positive': 'Parameter accommodation id must be a positive number',
          'number.unsafe': 'Parameter accommodation id must be a safe number',
          'any.required': 'Parameter accommodation id is required',
        }),
      roomId: Joi.number()
        .integer()
        .positive()
        .min(1)
        .messages({
          'number.base': 'Parameter room id must be a number',
          'string.min': 'Parameter room id length must be at least {{#limit}} characters long',
          'number.integer': 'Parameter room id must be an integer',
          'number.positive': 'Parameter room id must be a positive number',
          'number.unsafe': 'Parameter room id must be a safe number',
          'any.required': 'Parameter room id is required',
        }),


      status: Joi.string()
        .valid('available', 'booked')
        .messages({
          'string.base': 'status must be a string',
          'any.only': 'status must be {if(#valids.length == 1, "", "one of ")}{{#valids}}',
        }),
    });
    return schema.validate(data);
  }
}
export default AccommodationSchema;
