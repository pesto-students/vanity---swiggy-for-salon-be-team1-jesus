const User = require('../domain/models/user');
const CoreUtil = require('../utils/core');

module.exports = async (payload, context, t, repository) => {
  const { userRepository } = repository;

  const UID = CoreUtil.randomFTEID('UID');
  payload.uid = UID;
  const user = new User(payload);

  const new_user = await userRepository.add(user, t);

  return new_user;
};
