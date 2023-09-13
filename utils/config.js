const { JWT_SECRET_KEY_DEFAULT = 'Secret-Key' } = process.env;
const { DB_ADDRESS = 'mongodb://127.0.0.1:27017/bitfilmsdb' } = process.env;

module.exports = {
  JWT_SECRET_KEY_DEFAULT,
  DB_ADDRESS,
};
