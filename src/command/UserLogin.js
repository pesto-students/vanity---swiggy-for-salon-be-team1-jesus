module.exports = async (payload, context, t, repository) => {
  const { userRepository } = repository;
  const user = await userRepository.login(payload, t);
  return user;
};
