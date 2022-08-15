const express = require('express');
const db = require('../utils/database');
const salonServicesRouter = express.Router();

salonServicesRouter.post('/add', (req, res) => {
  const salonId = req.body.salonid;
  const service = req.body.service;
  const subService = req.body.subservice;
  const price = req.body.price;

  db.query(
    'INSERT INTO services(salonid, service, subservice, price) VALUES (?,?,?,?);',
    [salonId, service, subService, price],
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

salonServicesRouter.get('/', (req, res) => {
  const salonId = req.query.salonid;

  db.query(
    'SELECT * FROM services WHERE salonid = ?;',
    [salonId],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: 'Something went wrong!',
          err,
        });
        return;
      }

      if (result.length > 0) {
        res.status(200).json({
          total: result.length,
          result,
        });
      } else {
        res.status(400).json({
          message: 'No services found',
        });
      }
    }
  );
});

module.exports = salonServicesRouter;
