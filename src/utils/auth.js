require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

const createToken = (user) => {
  const accessToken = sign(
    { useremail: user.email, id: user.userId, username: user.name },
    process.env.JWT_SECRET
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const validToken = verify(token, process.env.JWT_SECRET);
    if (validToken) {
      req.authenticated = true;
      req.userId = validToken.id;
      req.email = validToken.useremail;
      next();
    }
  } catch (e) {
    return res.status(400).json({
      error: e,
    });
  }
};

module.exports = { createToken, validateToken };
