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

userRouter.post('/api/v1/signup', (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;
  const password = req.body.password;
  const city = req.body.city;
  const gender = req.body.gender;
  const budget = req.body.budget;
  const rating = req.body.rating;
  const vanityid = 'USR-' + Math.random().toString(36);

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }

    db.query(
      'INSERT into users(vanityid, name, email, phone, password, city, Gender, budget, rating) VALUES(?,?,?,?,?,?,?,?,?)',
      [vanityid, name, email, phone, hash, city, gender, budget, rating],
      (err, result) => {
        console.log(err);
      }
    );
  });
});
