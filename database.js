const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: 'vanity',
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Mysql DB Connected!');
});

module.exports = db;
