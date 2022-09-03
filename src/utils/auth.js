const { sign, verify } = require('jsonwebtoken');

const createToken = (user) => {
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
    console.log('validtoken', validToken);
    if (validToken) {
      req.authenticated = true;
      req.userId = validToken.id;
      req.email = validToken.useremail;
      return next();
    }
  } catch (e) {
    return res.status(400).json({
      error: err,
    });
  }
};

module.exports = { createToken, validateToken };
