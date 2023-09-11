const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  legacyHeaders: false,
  message: 'Превышено ограничение количества запросов, попробуйте снова позже.',
});

module.exports = authLimiter;
