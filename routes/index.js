const router = require('express').Router();

const { register, login } = require('../controllers/user');
const NotFoundError = require('../errors/NotFoundError');
const auth = require('../middlewares/auth');
const userRouter = require('./user');
const movieRouter = require('./movie');
const { registerValidation, loginValidation } = require('../middlewares/validation');
const authLimiter = require('../utils/rate-limiter');

router.post('/signup', authLimiter, registerValidation, register);
router.post('/signin', authLimiter, loginValidation, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страница по указанному маршруту не найдена.'));
});

module.exports = router;
