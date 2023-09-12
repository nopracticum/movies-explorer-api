require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('./middlewares/cors');
const handleErrors = require('./middlewares/errors');
const configureHelmet = require('./safety/configureHelmet');

const { DB_ADDRESS } = require('./utils/config');

mongoose
  .connect(DB_ADDRESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Успешное подключение к базе данных');
  })
  .catch((error) => {
    console.log('Ошибка при подключении к базе данных:', error.name);
  });

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors);

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.use(cookieParser());

configureHelmet(app);

app.use(require('./routes/index'));

app.use(handleErrors);

app.listen(PORT, () => {
});
