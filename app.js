const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const error = require('./middlewares/error');

const app = express();
const { PORT } = process.env;

app.listen(PORT, () => console.log(`App listening on port: ${PORT}`));

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb')
  .then(() => console.log('Connected to DB'))
  .catch((err) => console.error('Error:', err));

app.use(cors());
app.use(express.json());
app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(error);
