const express = require('express');

const userRouter = express.Router();

userRouter.use(express.json());
userRouter.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

userRouter.post('/api/v1/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query('SELECT * FROM users WHERE email=?', email, (err, result) => {
    if (err) {
      res.send({
        err: err,
      });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (response) {
          req.session.user = result;
          res.send({
            message: 'login successful',
            response,
          });
        } else {
          res.send({
            message: 'Wrong username/password combination!',
          });
        }
      });
    } else {
      res.send({
        message: 'user doesnt exist',
      });
    }
  });
});
