const express = require('express');
const { errors } = require('celebrate');
const { ROUTE_NOT_FOUND } = require('../utils/constants');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { createUser, login, logout } = require('../controllers/users');
const { loginValidator, createUserValidator } = require('../middlewares/validators');
const { requestLogger, errorLogger } = require('../middlewares/logger');
const auth = require('../middlewares/auth');
const rateLimiter = require('../safety/rateLimiter');
const NotFoundError = require('../errors/NotFoundError');

const router = express.Router();

const protectedRoutes = ['/users', '/movies', '/signout'];

router.use(requestLogger);

router.use(rateLimiter);

router.use((req, res, next) => {
  if (protectedRoutes.some((route) => req.path.startsWith(route))) {
    auth(req, res, next);
  } else {
    next();
  }
});

router.post('/signin', loginValidator, login);
router.post('/signup', createUserValidator, createUser);
router.post('/signout', logout);

router.use('/users', usersRouter);
router.use('/movies', moviesRouter);

router.use((req, res, next) => next(new NotFoundError(ROUTE_NOT_FOUND)));

router.use(errorLogger);

router.use(errors());

module.exports = router;
