const User = require('../domain/models/user');
const CoreUtil = require('../utils/core');
const bcrypt = require('bcrypt');
const { config } = require('dotenv');

module.exports = async (payload, context, t, repository) => {
  const { userRepository } = repository;

  console.log('$$$$$$$$', payload);
  const saltRounds = config.saltRound || 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(payload.password, salt);
  payload.password = hash;

  const UID = CoreUtil.randomFTEID('UID');
  if (!UID) {
    throw new Error('User id not generated properly!');
  }

  payload.userId = UID;
  const user = new User(payload);
  const new_user = await userRepository.add(user, t);

  return new_user;
};
