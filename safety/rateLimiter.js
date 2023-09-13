const rateLimit = require('express-rate-limit');

const { RATE_LIMIT_EXCEEDED } = require('../utils/constants');

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 1000,
  message: RATE_LIMIT_EXCEEDED,
});

module.exports = limiter;
