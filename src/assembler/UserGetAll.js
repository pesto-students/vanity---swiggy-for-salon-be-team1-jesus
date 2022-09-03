module.exports = async (payload, context, t, repository) => {
  const { userRepository } = repository;
  const user = await userRepository.getAll(payload, t);
  const pagination = {
    offset: payload.page,
    limit: payload.size,
    total: user.length,
  };
  return { user, pagination };
};
