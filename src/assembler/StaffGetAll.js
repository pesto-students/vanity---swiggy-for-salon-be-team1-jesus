module.exports = async (payload, context, t, repository) => {
  const { staffRepository } = repository;
  const staffs = await staffRepository.getAll(payload, t);
  return staffs;
};
