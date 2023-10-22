const mongoose = require('mongoose');
const config = require('./config');

const { db: { host, port, name } } = config;

module.exports.connectDatabase = () => mongoose.connect(`mongodb://${host}:${port}/${name}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
