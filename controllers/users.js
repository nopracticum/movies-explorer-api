const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;
const config = require('../utils/config');
const NotFoundError = require('../errors/notFoundError');

const User = require('../models/user');
const {
  SUCCESS_STATUS,
  CREATED_STATUS,
  INVALID_USER_DATA,
  CONFLICT_EMAIL,
  UNAUTHORIZED,
  LOGOUT_SUCCESS,
  INVALID_USER_UPDATE_DATA,
} = require('../utils/constants');

const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');
const UnauthorizedError = require('../errors/unauthorizedError');

const formatUserData = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
});

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name, email, password: hash,
    })
      .then((user) => res.status(CREATED_STATUS).send(formatUserData(user)))
      .catch((err) => {
        if (err.code === 11000) {
          return next(new ConflictError(CONFLICT_EMAIL));
        }
        if (err.name === 'ValidationError') {
          return next(new BadRequestError(INVALID_USER_DATA));
        }
        return next(err);
      })
      .catch(next);
  });
};

module.exports.getMe = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .then((user) => res.status(SUCCESS_STATUS).send(formatUserData(user)))
    .catch((err) => next(err));
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;
  User.findByIdAndUpdate(userId, { name, email }, {
    new: true,
    runValidators: true,
  })
    .orFail(new NotFoundError('Пользователь с данным id не найден'))
    .then((user) => {
      console.log(user);
      res.status(SUCCESS_STATUS).send(formatUserData(user));
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError(CONFLICT_EMAIL));
      }
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(INVALID_USER_UPDATE_DATA));
      }
      return next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail()
    .then((user) => bcrypt.compare(password, user.password).then((match) => {
      if (match) {
      // const token = jwt.sign({ _id: user._id },
        // NODE_ENV === 'production' ? JWT_SECRET_KEY : config.JWT_SECRET_KEY_DEFAULT);

        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET_KEY : config.JWT_SECRET_KEY_DEFAULT, { expiresIn: '7d' });

        return res.send({ token });

        // Устанавливаем httpOnly куку
        // return res.cookie('jwt', token, {
        //   maxAge: 3600000,
        //   httpOnly: true,
        //   sameSite: true,
        // }).send(formatUserData(user));
      }
      throw new UnauthorizedError(UNAUTHORIZED);
    }))
    .catch((err) => {
      if (err instanceof mongoose.Error.DocumentNotFoundError) {
        return next(new UnauthorizedError(UNAUTHORIZED));
      }
      return next(err);
    });
};

module.exports.logout = (req, res) => {
  // Удаление JWT из куков пользователя
  res.clearCookie('jwt', {
    httpOnly: true,
    sameSite: true,
  }).send({ message: LOGOUT_SUCCESS });
};
