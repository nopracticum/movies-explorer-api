const winston = require('winston');
const expressWinston = require('express-winston');

const publicRoutes = ['/signin', '/signup', '/signout'];

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
  skip: (req) => publicRoutes.includes(req.path),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
