const mysql = require('mysql2');
const salons = require('../model/salonsModel');
const users = require('../model/userModel');
//
//require('dotenv').config();

// const db = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
// });

const db = mysql.createConnection({
  host: 'remotemysql.com',
  user: 'u2OZWuFU4K',
  password: 'aJedyc8vcY',
  database: 'u2OZWuFU4K',
});

db.connect((err) => {
  if (err) {
    console.log('err');
    throw err;
  }
  console.log('Mysql DB Connected!');
});

db.query(users, function (err, results, fields) {
  if (err) {
    console.log(err.message);
  }
});

db.query(salons, function (err) {
  if (err) {
    console.log(err.message);
  }
});

module.exports = db;
