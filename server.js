const express = require('express');
require('dotenv').config();

const userRouter = require('./routes/userRoute');

const app = express();

app.post('/api/v1/qwe', (req, res) => {
  console.log(req.body);
  res.status(200).json({
    message: 'reached server',
    good: 'good',
  });
});

app.use('/api/v1/user', userRouter);

// db.query(`select * from vanity.users`, (err, res) => {
//   console.log(res);
// });

const PORT = process.env.PORT;
app.listen(PORT || 3001, () => {
  console.log(`Server started at port ${PORT}`);
});
