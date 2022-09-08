module.exports = async (payload, context, t, repository) => {
  const { paymentRepository } = repository;
  const payments = await paymentRepository.getAll(payload, t);
  return payments;
};
