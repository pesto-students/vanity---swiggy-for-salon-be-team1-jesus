const express = require('express');
const db = require('../database');
const cors = require('cors');
const userRouter = express.Router();
const bcrypt = require('bcrypt');
// const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');
const saltRounds = 10;

userRouter.use(express.json());
userRouter.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  })
);

userRouter.post('/signup', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const city = req.body.city;
  const gender = req.body.gender || 'Not Mentioned';
  const budget = req.body.budget || 0;
  const rating = req.body.rating || 0;
  const vanityid = 'USR-' + Math.random().toString(36);

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      res.status(500).json({
        message: 'Something went wrong!',
      });
    }

    db.query(
      'INSERT into users(vanityid, name, email, phone, password, city, Gender, budget, rating) VALUES(?,?,?,?,?,?,?,?,?)',
      [vanityid, name, email, phone, hash, city, gender, budget, rating],
      (err, result) => {
        if (err) {
          res.status(400).json({
            err: err.sqlMessage,
          });
          return;
        }

        res.status(201).json({
          message: 'Signup successfull',
          result,
        });
      }
    );
  });
});

userRouter.post('/login', async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  db.query('SELECT * FROM usersLogin WHERE email=?', email, (err, result) => {
    if (err) {
      res.status(500).json({
        message: 'Something went wrong!',
      });
    }

    if (result.length > 0) {
      bcrypt.compare(password, result[0].password, (err, response) => {
        if (response) {
          res.status(200).json({
            message: 'login successful',
            response,
          });
        } else {
          res.status(400).json({
            message: 'Wrong username/password combination!',
          });
        }
      });
    } else {
      res.status(404).json({
        message: 'user doesnt exist',
      });
    }
  });
});

userRouter.post('/aps', (req, res) => {
  console.log(req);
  res.send({
    message: 'good',
  });
});

module.exports = userRouter;
