const Staff = require('../domain/models/staff');
const CoreUtil = require('../utils/core');

module.exports = async (payload, context, t, repository) => {
  const { staffRepository } = repository;

  const STF = CoreUtil.randomFTEID('STF');
  if (!STF) {
    throw new Error('Staff id not generated properly!');
  }

  payload.staffId = STF;
  const staff = new Staff(payload);
  const new_staff = await staffRepository.add(staff, t);

  return new_staff;
};
