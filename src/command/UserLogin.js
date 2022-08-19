module.exports = async (payload, context, t, repository) => {
  const { userRepository } = repository;
  const user = await userRepository.getOne(payload, t);
  return user;
};
