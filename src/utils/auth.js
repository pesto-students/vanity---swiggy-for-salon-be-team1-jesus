const { sign, verify } = require('jsonwebtoken');

const createToken = (user) => {
  console.log('===', user.email, user.userId, user.name);
  const accessToken = sign(
    { useremail: user.email, id: user.userId, username: user.name },
    'jsonsecret'
  );

  return accessToken;
};

const validateToken = (req, res, next) => {
  const accessToken = req.cookies['access-token'];

  if (!accessToken)
    return res.status(400).json({
      error: 'User not authenticated',
    });

  try {
    const validToken = verify(accessToken, 'jsonsecret');
    if (validToken) {
      req.authenticated = true;
      return next();
    }
  } catch (e) {
    return res.status(400).json({
      error: err,
    });
  }
};

module.exports = { createToken, validateToken };
