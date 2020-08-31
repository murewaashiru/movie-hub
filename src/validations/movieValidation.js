const Joi = require('@hapi/joi');

const validator = require('./validator');

class MovieValidation {
  static validateMovieListing(req, res, next) {
    const format = Joi.object().keys(
      {
        movieId: Joi.number().required(),
        userId: Joi.string().required(),
        url: Joi.string().optional(),
      },
      {}
    );

    validator(format, req.body, res, next);
  }

  static getMovieListing(req, res, next) {
    const format = Joi.object().keys(
      {
        userId: Joi.string().optional(),
      },
      {}
    );

    validator(format, req.body, res, next);
  }

  static removeFromList(req, res, next) {
    const format = Joi.object().keys(
      {
        id: Joi.number().required(),
        userId: Joi.string().required(),
      },
      {}
    );

    validator(format, req.body, res, next);
  }

  static movieRating(req, res, next) {
    const format = Joi.object().keys(
      {
        id: Joi.number().required(),
        userId: Joi.string().required(),
        rating: Joi.number().required(),
      },
      {}
    );

    validator(format, req.body, res, next);
  }
}

module.exports = MovieValidation;
