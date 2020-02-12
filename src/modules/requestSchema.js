import Joi from '@hapi/joi';

/**
 * @description RequestSchema class validates user data
*/
class RequestSchema {
  /**
   * @static
   * @param {obj} data
   * @returns {obj} returns schema object
  */
  static destinationSchema(data) {
    const schema = Joi.object().keys({
      passportNumber: Joi.number()
        .required()
        .messages({
          'string.base': 'passportNumber must be number',
          'any.required': 'passportNumber is required',
          'string.empty': 'passportNumber is not allowed to be empty'
        }),
      passportName: Joi.string()
        .required()
        .messages({
          'string.base': 'passportName must be string',
          'any.required': 'passportName is required',
          'string.empty': 'passportName is not allowed to be empty'
        }),
      gender: Joi.string().trim().required().valid('Male', 'Female'),
      dob: Joi.date()
        .messages({
          'date.base': 'dob must be a date',
        }),
      origin: Joi.string()
        .trim()
        .regex(/^[a-zA-Z]+,\s[a-zA-Z]+$/)
        .required()
        .min(2)
        .messages({
          'string.regex': '"origin" must be in Country, City format'
        }),
      destination: Joi.string()
        .trim()
        .regex(/^[a-zA-Z]+,\s[a-zA-Z]+$/)
        .required()
        .min(2)
        .messages({
          'any.regex': '"origin" must be in Country, City format'
        }),
      travelDate: Joi
        .date()
        .min(Date.now())
        .required()
        .messages({
          'date.base': 'traval date must have format of yyyy-mm-dd',
          'date.min': 'traval date must have format of yyyy- mm - dd and can not be in the past',
        }),
      reason: Joi.string()
        .trim()
        .required()
        .min(3)
        .messages({
          'string.base': 'reason must be a string',
          'string.min': 'reason length must be at least {{#limit}} characters long',
          'any.required': 'reason is required',
          'string.pattern.base': 'reason must be at least 3 characters long letter'
        }),
      accommodationId: Joi.number()
        .integer()
        .required(),
      rememberMe: Joi.optional()
    });
    return schema.validate(data);
  }

  /**
   * @static
   * @param {obj} data
   * @returns {obj} returns schema object
  */
  static updateSchema(data) {
    const schema = Joi.object().keys({
      passportNumber: Joi.number()
        .messages({
          'string.base': 'passportNumber must be number',
          'string.empty': 'passportNumber is not allowed to be empty'
        }),
      passportName: Joi.string()
        .messages({
          'string.base': 'passportName must be string',
          'string.empty': 'passportName is not allowed to be empty'
        }),
      gender: Joi.string().trim().valid('Male', 'Female'),
      dob: Joi.date()
        .messages({
          'date.base': 'dob must be a date',
        }),
      origin: Joi.string()
        .trim()
        .regex(/^[a-zA-Z]+,\s[a-zA-Z]+$/)
        .min(2)
        .messages({
          'string.regex': '"origin" must be in Country, City format'
        }),
      destination: Joi.string()
        .trim()
        .regex(/^[a-zA-Z]+,\s[a-zA-Z]+$/)
        .min(2)
        .messages({
          'any.regex': '"origin" must be in Country, City format'
        }),
      travelDate: Joi
        .date()
        .min(Date.now())
        .messages({
          'date.base': 'traval date must have format of yyyy-mm-dd',
          'date.min': 'traval date must have format of yyyy- mm - dd and can not be in the past',
        }),
      reason: Joi.string()
        .trim()
        .min(3)
        .messages({
          'string.base': 'reason must be a string',
          'string.min': 'reason length must be at least {{#limit}} characters long',
          'any.required': 'reason is required',
          'string.pattern.base': 'reason must be at least 3 characters long letter'
        }),
      accommodationId: Joi.number()
        .integer(),
      rememberMe: Joi.optional()
    });
    return schema.validate(data);
  }

  /**
   * @static
   * @param {obj} data
   * @returns {obj} returns schema object
  */
  static returnDateSchema(data) {
    const schema = Joi.object({
      returnDate: Joi
        .date()
        .iso()
        .min(data.travelDate)
        .required()
        .messages({
          'date.base': 'return date must have format of yyyy-mm-dd',
          'date.min': 'return date must have format of yyyy-mm-dd and not earlier than the travel date',
        })
    });
    return schema.validate({ returnDate: data.returnDate });
  }

  static requestParam(data) {
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

export default RequestSchema;
