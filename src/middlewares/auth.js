const SessionHandler = require('../utils/sessionHandler');
const { errorResponse } = require('../utils/response');

const auth = async (req, res, next) => {
  if (!req.headers.authorization) {
    return errorResponse(res, 403, 'Bearer token required');
  }
  try {
    const token = req.headers.authorization.split(' ')[1];

    const payload = await SessionHandler.decodeToken({ token });

    req.user = payload;
    next();
  } catch (error) {
    return errorResponse(res, 403, 'Invalid or expired token');
  }
};

module.exports = auth;
