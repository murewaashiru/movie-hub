const { hash, genSalt, compareSync } = require('bcrypt');
const { Users } = require('../database/models');
const SessionHandler = require('../utils/SessionHandler');
const { successResponse, errorResponse } = require('../utils/response');

const createUser = async (req, res, next) => {
  const user = req.body;

  const result = {};
  try {
    const userExists = await Users.findOne({
      where: { email: user.email, username: user.username },
    });
    if (userExists !== null) {
      return errorResponse(res, 409, 'Username or email already taken');
    }

    const salt = await (0, genSalt)(10);
    const newPassword = await hash(user.password, salt);
    user.password = newPassword;

    const data = await Users.create(user);
    result.id = data.id;
    result.email = data.email;
    result.username = data.username;
    result.token = await SessionHandler.generateToken(data);

    return successResponse(res, 201, 'Account created successfully', result);
  } catch (err) {
    return next(err);
  }
};

const login = async (req, res, next) => {
  const user = req.body;
  const data = {};

  try {
    const userExists = await Users.findOne({ where: { email: user.email } });
    if (!userExists) {
      return errorResponse(res, 404, 'User does not exist');
    }
    const passwordCorrect = compareSync(user.password, userExists.password);
    if (!passwordCorrect) {
      return errorResponse(res, 400, 'Incorrect password');
    }

    data.id = userExists.id;
    data.email = userExists.email;
    data.username = userExists.username;
    data.token = await SessionHandler.generateToken(userExists);

    return successResponse(res, 200, 'Login successful', data);
  } catch (err) {
    return next(err);
  }
};

module.exports = { createUser, login };
