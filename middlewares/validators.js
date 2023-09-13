const { celebrate, Joi, Segments } = require('celebrate');

const createUserValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    password: Joi.string().required(),
  },
});

const updateUserValidator = celebrate({
  [Segments.BODY]: {
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
  },
});

const userIdValidator = celebrate({
  [Segments.PARAMS]: {
    userId: Joi.string().required().hex().length(24),
  },
});

const loginValidator = celebrate({
  [Segments.BODY]: {
    email: Joi.string().required().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
    password: Joi.string().required(),
  },
});

const createMovieValidator = celebrate({
  [Segments.BODY]: {
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().uri(),
    trailerLink: Joi.string().required().uri(),
    thumbnail: Joi.string().required().uri(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  },
});

const movieIdValidator = celebrate({
  [Segments.PARAMS]: {
    movieId: Joi.string().required().hex().length(24),
  },
});

module.exports = {
  createUserValidator,
  updateUserValidator,
  loginValidator,
  userIdValidator,
  createMovieValidator,
  movieIdValidator,
};
