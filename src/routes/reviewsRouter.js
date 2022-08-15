const express = require('express');
const db = require('../utils/database');
const reviewsRouter = express.Router();

reviewsRouter.post('/', (req, res) => {
  const salonId = req.body.salonid;
  const userId = req.body.userid;
  const username = req.body.username;
  const review = req.body.review;
  const rating = req.body.rating;

  db.query(
    'INSERT INTO reviews (salonid, userid, username, review, rating) VALUES (?,?,?,?,?);',
    [salonId, userId, username, review, rating],
    (err, result) => {
      if (err) {
        res.status(500).json({
          message: 'Something went wrong!',
          err,
        });
        return;
      }
      res.status(201).json({
        message: 'Review added successfully!',
        result,
      });
    }
  );
});

reviewsRouter.get('/', (req, res) => {
  const salonId = req.query.salonid;

  db.query(
    'SELECT * FROM reviews WHERE salonid = ?;',
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
          message: 'No reviews found',
        });
      }
    }
  );
});

module.exports = reviewsRouter;
