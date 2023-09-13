const mongoose = require('mongoose');
const validator = require('validator');

const { INVALID_ADDRESS } = require('../utils/constants');

const movieschema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    required: true,
    type: Number,
  },
  year: {
    required: true,
    type: String,
  },
  description: {
    required: true,
    type: String,
  },
  image: {
    required: true,
    type: String,
    validate: {
      validator: (URL) => validator.isURL(URL),
      message: INVALID_ADDRESS,
    },
  },
  trailerLink: {
    required: true,
    type: String,
    validate: {
      validator: (URL) => validator.isURL(URL),
      message: INVALID_ADDRESS,
    },
  },
  thumbnail: {
    required: true,
    type: String,
    validate: {
      validator: (URL) => validator.isURL(URL),
      message: INVALID_ADDRESS,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    required: true,
    type: String,
  },
  nameEN: {
    required: true,
    type: String,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('Movie', movieschema);
