const express = require('express');
const db = require('../utils/database');
const salonsRouter = express.Router();

salonsRouter.post('/add', (req, res) => {
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

module.exports = salonsRouter;
