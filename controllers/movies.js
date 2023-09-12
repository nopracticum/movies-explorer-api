const mongoose = require('mongoose');
const Movie = require('../models/movie');
const {
  SUCCESS_STATUS,
  CREATED_STATUS,
  INVALID_MOVIE_DATA,
  INVALID_MOVIE_ID,
  DELETE_MOVIE_FORBIDDEN,
  MOVIE_NOT_FOUND,
  MOVIE_DELETED,
} = require('../utils/constants');
const BadRequestError = require('../errors/badRequestError');
const NotFoundError = require('../errors/notFoundError');
const ForbiddenError = require('../errors/forbiddenError');

const populateOptions = [
  { path: 'owner', select: ['name', '_id'] },
];

const formatMovie = (movie) => ({
  _id: movie._id,
  country: movie.country,
  director: movie.director,
  duration: movie.duration,
  year: movie.year,
  description: movie.description,
  image: movie.image,
  trailerLink: movie.trailerLink,
  thumbnail: movie.thumbnail,
  owner: {
    _id: movie.owner._id,
    name: movie.owner.name,
  },
  movieId: movie.movieId,
  nameRU: movie.nameRU,
  nameEN: movie.nameEN,
});

module.exports.createMovie = (req, res, next) => {
  const data = { ...req.body, owner: req.user._id };
  Movie.create(data)
    .then((movie) => res.status(CREATED_STATUS).send(formatMovie(movie)))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INVALID_MOVIE_DATA));
      }
      return next(err);
    });
};

module.exports.deleteMovieById = (req, res, next) => {
  const userId = req.user._id;
  Movie.findById(req.params.movieId)
    .orFail()
    .then((movie) => {
      if (movie.owner._id.toString() !== userId) {
        throw new ForbiddenError(DELETE_MOVIE_FORBIDDEN);
      }
      return Movie.deleteOne({ _id: req.params.movieId })
        .then(() => {
          res.status(SUCCESS_STATUS).send({ message: MOVIE_DELETED });
        });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequestError(INVALID_MOVIE_ID));
      }
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new NotFoundError(MOVIE_NOT_FOUND));
      }
      return next(err);
    });
};

module.exports.getUserMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .populate(populateOptions)
    .then((movies) => res.status(SUCCESS_STATUS).send(movies.map(formatMovie)))
    .catch((err) => next(err));
};
