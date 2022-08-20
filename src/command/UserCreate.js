const User = require('../domain/models/user');
const CoreUtil = require('../utils/core');
const bcrypt = require('bcrypt');

module.exports = async (payload, context, t, repository) => {
  const { userRepository } = repository;

  const saltRounds = 10;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(payload.Password, salt);
  payload.Password = hash;

  const UID = CoreUtil.randomFTEID('UID');
  payload.UserId = UID;
  const user = new User(payload);

  const new_user = await userRepository.add(user, t);

  return new_user;
};
