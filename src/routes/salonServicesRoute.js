const express = require('express');
const db = require('../utils/database');
const salonServicesRouter = express.Router();

salonServicesRouter.post('/add', (req, res) => {
  const salonId = req.body.salonid;
  const service = req.body.service;
  const subService = req.body.subservice;
  const price = req.body.price;

  console.log(salonId, service, subService, price);

  db.query(
    'INSERT INTO services(salonid, service, subservice, price) VALUES (?,?,?,?)',
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: 'Something went wrong!',
          err,
        });
        return;
      }
      res.status(201).json({
        message: 'Service added successfully!',
        result,
      });
    }
  );
});

module.exports = salonServicesRouter;
