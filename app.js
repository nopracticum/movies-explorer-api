const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');

const routes = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const config = require('./config');
const { connectDatabase } = require('./db');

const app = express();

app.use(helmet());
app.disable('x-powered-by');

app.use(cookieParser());
app.use(express.json());

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(cors);

connectDatabase();

app.use(routes);


app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

app.listen(config.app.port);
