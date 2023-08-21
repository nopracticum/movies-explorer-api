const router = require('express').Router();

const { register, login } = require('../controllers/user');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const userRouter = require('./user');
const movieRouter = require('./movie');

router.post('/signup', register);
router.post('/signin', login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
