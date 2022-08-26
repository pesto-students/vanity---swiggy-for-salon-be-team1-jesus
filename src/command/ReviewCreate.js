const Review = require('../domain/models/review');
const CoreUtil = require('../utils/core');

module.exports = async (payload, context, t, repository) => {
  const { reviewRepository } = repository;
  const RID = CoreUtil.randomFTEID('RID');
  if (!RID) {
    throw new Error('review id not generated properly!');
  }

  payload.reviewId = RID;
  const review = new Review(payload);
  const new_review = await reviewRepository.add(review, t);

  return new_review;
};
