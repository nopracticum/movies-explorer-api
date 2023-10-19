const router = require('express').Router();

const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { validateUserBody, validateAuthentication } = require('../middlewares/validations');
const NotFoundError = require('../errors/NotFoundError');
const { createUser, login } = require('../controllers/users');

router.post('/signup', validateUserBody, createUser);

router.post('/signin', validateAuthentication, login);

router.get('/signout', (req, res) => {
  res.clearCookie('jwt').send({ message: 'Выход' });
});

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Страница не найдена :('));
});

module.exports = router;
