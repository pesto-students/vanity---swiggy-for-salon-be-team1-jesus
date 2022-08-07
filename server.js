const express = require('express');
require('dotenv').config();

const db = require('./database');

const app = express();

app.get('/api/v1', (req, res) => {
  res.status(200).json({
    message: 'success',
  });
});

db.query(`select * from vanity.users`, (err, res) => {
  console.log(res);
});

const PORT = process.env.PORT;
app.listen(PORT || 3001, () => {
  console.log(`Server started at port ${PORT}`);
});
