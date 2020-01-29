import Joi from 'joi';

class Validator {
  constructor() {
    this.created = new Date().toString();
  }

  static schemaSignIn(dataToValidate) {
    const inSchema = {
      email: Joi.string().email().required(),
      password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required().trim(),
    };
    return Joi.validate(dataToValidate, inSchema);
  }
}

const expValidator = new Validator();
export default expValidator;
