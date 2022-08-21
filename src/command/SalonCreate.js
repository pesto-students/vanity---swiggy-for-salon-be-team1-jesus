const User = require('../domain/models/salon');
const CoreUtil = require('../utils/core');

module.exports = async (payload, context, t, repository) => {
  const { salonRepository } = repository;
  const SID = CoreUtil.randomFTEID('SID');
  if (!SID) {
    throw new Error('Salon id not generated properly!');
  }

  payload.salonId = SID;
  const salon = new User(payload);
  const new_salon = await salonRepository.add(salon, t);

  return new_salon;
};
