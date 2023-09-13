require('dotenv').config();
const jwt = require('jsonwebtoken');

const config = require('../utils/config');
const { AUTHORIZATION_REQUIRED } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { NODE_ENV, JWT_SECRET_KEY } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError(AUTHORIZATION_REQUIRED));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_KEY : config.JWT_SECRET_KEY_DEFAULT);
  } catch (err) {
    const error = new UnauthorizedError(AUTHORIZATION_REQUIRED);
    return next(error);
  }

  req.user = payload;
  return next();
};
