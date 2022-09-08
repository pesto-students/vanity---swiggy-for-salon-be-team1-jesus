module.exports = async (payload, context, t, repository) => {
  const { bookingRepository } = repository;
  const booking = await bookingRepository.getAll(payload, t);
  const pagination = {
    offset: payload.page,
    limit: payload.size,
    total: booking.length,
  };
  return { booking, pagination };
};
