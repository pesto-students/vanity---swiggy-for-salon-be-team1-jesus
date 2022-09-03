module.exports = async (payload, context, t, repository) => {
  const { serviceRepository } = repository;
  const services = await serviceRepository.getAll(payload, t);

  return services;
};
