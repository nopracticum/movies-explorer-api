const router = require('express').Router();

const {
  deleteMovieById, getUserMovies, createMovie,
} = require('../controllers/movies');

const {
  createMovieValidator, movieIdValidator,
} = require('../middlewares/validators');

router.get('/', getUserMovies);
router.post('/', createMovieValidator, createMovie);
router.delete('/:movieId', movieIdValidator, deleteMovieById);

module.exports = router;
