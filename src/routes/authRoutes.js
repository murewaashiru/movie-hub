const express = require('express');

const UserValidation = require('../validations/authValidation');
const Auth = require('../controllers/authController');

const router = express.Router();

router.route('/signup').post(UserValidation.validateSignup, Auth.createUser);
router.route('/login').post(UserValidation.validateLogin, Auth.login);
module.exports = router;
