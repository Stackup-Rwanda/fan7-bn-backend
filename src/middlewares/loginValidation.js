/* eslint-disable class-methods-use-this */
import Joi from 'joi';

class Validator {
  constructor() {
    this.createdDate = new Date().toString();
  }

  schemaSignIn(dataToValidate) {
    const inSchema = {
      email: Joi.string()
        .min(3)
        .max(32)
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .max(64)
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required(),
    };
    return Joi.validate(dataToValidate, inSchema);
  }
}

const expValidator = new Validator();
export default expValidator;
