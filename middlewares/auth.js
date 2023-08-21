const UnauthorizedError = require('../errors/UnauthorizedError');
const { verifyJwtToken } = require('../helpers/jwt');

const authErrorMessage = 'При авторизации произошла ошибка. Переданный токен некорректен';
const authWronToken = 'При авторизации произошла ошибка. Токен не передан или передан не в том формате';

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new UnauthorizedError(authWronToken));
  }
  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = verifyJwtToken(token);
  } catch (err) {
    next(new UnauthorizedError(authErrorMessage));
  }
  req.user = payload;
  next();
};

module.exports = auth;
