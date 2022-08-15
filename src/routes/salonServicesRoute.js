const express = require('express');
const db = require('../utils/database');
const salonServicesRouter = express.Router();

salonServicesRouter.post('/add', (req, res) => {
  const salonId = req.body.salonid;
  const service = req.body.service;
  const subService = req.body.subservice;
  const price = req.body.price;

  db.query(
    'INSERT INTO services(salonid, service, subservice, price) values(?,?,?,?);',
    [salonId, service, subService, price],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: 'Something went wrong!',
          err,
        });
      }
      res.status(201).json({
        message: 'Service added successfully!',
        result,
      });
    }
  );
});

module.exports = salonServicesRouter;
