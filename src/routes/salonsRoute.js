const express = require('express');
const db = require('../utils/database');
const salonsRouter = express.Router();

salonsRouter.post('/data', (req, res) => {
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const ownerName = req.body.ownerName;
  const ownerQuote = req.body.ownerQuote;
  const manPower = req.body.manPower;
  const rating = req.body.rating;
  const bestFor = req.body.bestFor;

  const vanityid = 'USR-' + Math.random().toString(36);

  db.query(
    'INSERT into salons(vanityid, name, address, city, owner_name, owner_quote, manpower, rating, best_for) VALUES(?,?,?,?,?,?,?,?,?)',
    [
      vanityid,
      name,
      address,
      city,
      ownerName,
      ownerQuote,
      manPower,
      rating,
      bestFor,
    ],
    (err, result) => {
      if (err) {
        res.status(400).json({
          err: err.sqlMessage,
        });
        return;
      }

      res.status(201).json({
        message: 'Salon data added successfully',
        result,
      });
    }
  );
});

salonsRouter.get('/list', (req, res) => {
  console.log(req.query);
  const rating = req.query.rating || 0;
  const city = req.query.city;
  const bestFor = req.query.bestFor;

  let cQuery = '',
    bQuery = '';
  const query = `SELECT * FROM salons where rating >= ${rating}`;

  if (city) {
    cQuery = ` AND city = '${city}'`;
  }
  if (bestFor) {
    bQuery = ` AND best_For IN ( '${bestFor}', 'BOTH')`;
  }

  const mQuery = query + cQuery + bQuery + ';';

  db.query(mQuery, (err, result) => {
    if (err) {
      res.status(400).json({
        err: err.sqlMessage,
      });
      return;
    }

    res.status(200).json({
      total: result.length,
      result,
    });
  });
});

module.exports = salonsRouter;
