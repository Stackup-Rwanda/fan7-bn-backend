import Joi from '@hapi/joi';

/**
 * @description UserSchema class validates user data
*/
class UserSchema {
  /**
   * @static
   * @param {obj} data
   * @returns {obj} returns schema object
  */
  static signup(data) {
    const schema = Joi.object({
      firstName: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
          'string.base': 'firstName must be a string',
          'string.min': 'firstName length must be at least {{#limit}} characters long',
          'string.max': 'firstName length must be less than or equal to {{#limit}} characters long',
          'any.required': 'firstName is required',
          'string.empty': 'firstName is not allowed to be empty'
        }),

      lastName: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
          'string.base': 'lastName must be a string',
          'string.min': 'lastName length must be at least {{#limit}} characters long',
          'string.max': 'lastName length must be less than or equal to {{#limit}} characters long',
          'any.required': 'lastName is required',
          'string.empty': 'lastName is not allowed to be empty'
        }),

      email: Joi.string()
        .email()
        .required()
        .messages({
          'string.base': 'email must be a string',
          'string.email': 'email must be a valid email',
          'any.required': 'email is required',
          'string.empty': 'email is not allowed to be empty'
        }),

      userName: Joi.string()
        .min(3)
        .max(30)
        .required()
        .messages({
          'string.base': 'userName must be a string',
          'string.min': 'userName length must be at least {{#limit}} characters long',
          'string.max': 'userName length must be less than or equal to {{#limit}} characters long',
          'any.required': 'userName is required',
          'string.empty': 'userName is not allowed to be empty'
        }),

      password: Joi.string()
        .min(8)
        .max(64)
        .required()
        .pattern(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .messages({
          'string.base': 'password must be a string',
          'string.min': 'password length must be at least {{#limit}} characters long',
          'string.max': 'password length must be less than or equal to {{#limit}} characters long',
          'any.required': 'password is required',
          'string.pattern.base': 'password must include at least a number and a capital letter',
          'string.empty': 'password is not allowed to be empty'
        }),
    });

    return schema.validate(data);
  }
}

export default UserSchema;
