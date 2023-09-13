const allowedCors = [
  'localhost:3000',
  'http://localhost:3000',
  'https://localhost:3000',
  'http://localhost:3001',
  'https://localhost:3001',
  'http://api.nomoremoviesexplorer.nomoredomainsicu.ru',
  'https://api.nomoremoviesexplorer.nomoredomainsicu.ru',
  'http://nomoremoviesexplorer.nomoredomainsicu.ru',
  'https://nomoremoviesexplorer.nomoredomainsicu.ru',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const requestHeaders = req.headers['access-control-request-headers'];
  const allowesMethods = 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS';

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', allowesMethods);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  return next();
};
