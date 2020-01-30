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
        .min(8)
        .max(64)
        .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .required(),
    };
    return Joi.validate(dataToValidate, inSchema);
  }
}

const expValidator = new Validator();
export default expValidator;
