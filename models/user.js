const mongoose = require('mongoose');
const validator = require('validator');

const { INVALID_EMAIL } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  email: {
    required: true,
    type: String,
    validate: {
      validator: (email) => (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email),
      message: INVALID_EMAIL,
    },
    unique: true,
  },
  password: {
    required: true,
    type: String,
    select: false,
  },
}, {
  versionKey: false, // Отключение опции versionKey
});

module.exports = mongoose.model('user', userSchema);
