const Joi = require('@hapi/joi');
const validator = require('./validator');

class UserValidation {
  static validateSignup(req, res, next) {
    const format = Joi.object().keys(
      {
        username: Joi.string().required(),
        email: Joi.string()
          .email({
            minDomainSegments: 2,
            tlds: { allow: true },
          })
          .trim()
          .required(),
        password: Joi.string().required(),
      },
      {}
    );

    validator(format, req.body, res, next);
  }

  static validateLogin(req, res, next) {
    const format = Joi.object().keys(
      {
        email: Joi.string().required(),
        password: Joi.string().required(),
      },
      {}
    );
    validator(format, req.body, res, next);
  }
}

module.exports = UserValidation;
