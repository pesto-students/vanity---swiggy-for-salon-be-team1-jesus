module.exports = async (payload, context, t, repository) => {
  const { reviewRepository } = repository;
  const reviews = await reviewRepository.getAll(payload, t);
  return reviews;
};
