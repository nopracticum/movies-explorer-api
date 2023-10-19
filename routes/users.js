const router = require('express').Router();

const { validateUserName } = require('../middlewares/validations');
const { getCurrentUser, updateUserInfo } = require('../controllers/users');

router.get('/me', getCurrentUser);

router.patch('/me', validateUserName, updateUserInfo);

module.exports = router;
