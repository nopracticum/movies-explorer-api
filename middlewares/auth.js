const UnauthorizedError = require('../errors/UnauthorizedError');
const { verifyJwtToken } = require('../helpers/jwt');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError('Ошибка авторизации'));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = verifyJwtToken(token);
  } catch (err) {
    next(new UnauthorizedError('Ошибка авторизации'));
  }
  req.user = payload;
  next();
};

module.exports = auth;

