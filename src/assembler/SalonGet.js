module.exports = async (payload, context, t, repository) => {
  const { salonRepository } = repository;
  const salon = await salonRepository.search(payload, t);
  const pagination = {
    offset: payload.page,
    limit: payload.size,
    total: salon.length,
  };
  return { salon, pagination };
};
