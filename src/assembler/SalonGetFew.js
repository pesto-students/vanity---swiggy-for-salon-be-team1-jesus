module.exports = async (payload, context, t, repository) => {
  const { salonRepository } = repository;
  const salons = await salonRepository.getFew(payload, t);
  return salons;
};
