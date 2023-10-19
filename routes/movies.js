const router = require('express').Router();

const { validateMovieBody, validateMovieId } = require('../middlewares/validations');

const {
  getMovies,
  createMovie,
  removeMovieById,
} = require('../controllers/movies');

router.get('/', getMovies);

router.post('/', validateMovieBody, createMovie);

router.delete('/:movieId', validateMovieId, removeMovieById);

module.exports = router;
