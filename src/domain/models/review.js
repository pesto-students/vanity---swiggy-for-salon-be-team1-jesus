const { attributes } = require('structure');

const Review = attributes({
  reviewId: { type: String, required: true, exactLength: 40 },
  review: { type: String, required: true },
  rating: { type: Number, required: true },
  userId: { type: String, required: true },
  salonId: { type: String, required: true },
  userName: { type: String },
  salonName: { type: String },
})(class Review {});

module.exports = Review;
