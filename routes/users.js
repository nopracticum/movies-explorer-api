const router = require('express').Router();

const {
  updateUser, getMe,
} = require('../controllers/users');

const {
  updateUserValidator,
} = require('../middlewares/validators');

router.get('/me', getMe);
router.patch('/me', updateUserValidator, updateUser);

module.exports = router;
