const jwt = require('jsonwebtoken');

/** Class managing user sessions */
class SessionHandler {
  static generateToken(data) {
    const token = jwt.sign(
      {
        id: data.id,
        username: data.username,
        email: data.email,
      },
      data.secret || process.env.TOKEN_SECRET,
      { expiresIn: '24hr' }
    );
    return token;
  }

  static decodeToken(data) {
    try {
      return jwt.verify(data.token, data.secret || process.env.TOKEN_SECRET);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = SessionHandler;
