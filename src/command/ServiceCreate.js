const Service = require('../domain/models/service');
const CoreUtil = require('../utils/core');

module.exports = async (payload, context, t, repository) => {
  const { serviceRepository } = repository;
  const SID = CoreUtil.randomFTEID('SVC');
  if (!SID) {
    throw new Error('service id not generated properly!');
  }

  payload.serviceId = SID;
  const service = new Service(payload);
  const new_service = await serviceRepository.add(service, t);
  return new_service;
};
