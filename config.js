require('dotenv').config();

let {
  NODE_ENV,
  JWT_SECRET,
  APP_HOST,
  APP_PORT,
  DB_HOST,
  DB_PORT,
  DB_NAME,
} = process.env;

if (NODE_ENV !== 'production') {
  NODE_ENV = 'dev';
  JWT_SECRET = 'dev-secret';
  APP_HOST = 'localhost';
  APP_PORT = 3000;
  DB_HOST = '127.0.0.1';
  DB_PORT = 27017;
  DB_NAME = 'bitfilmsdb';
}

const config = {
  app: {
    host: APP_HOST,
    port: APP_PORT,
    name: 'movies-explorer-api',
    jwtSecret: JWT_SECRET,
  },
  db: {
    host: DB_HOST,
    port: DB_PORT,
    name: DB_NAME,
  },
};

module.exports = config;
