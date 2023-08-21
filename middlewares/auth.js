const UnauthorizedError = require('../errors/UnauthorizedError');
const { authorizationTokenInvalidError, authorizationTokenFormatError } = require('../utils/constants');
const { verifyJwtToken } = require('../utils/jwt');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(authorizationTokenFormatError));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = verifyJwtToken(token);
  } catch (err) {
    next(new UnauthorizedError(authorizationTokenInvalidError));
  }
  req.user = payload;
  next();
};

module.exports = auth;
