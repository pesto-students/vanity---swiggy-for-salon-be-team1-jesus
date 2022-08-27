module.exports = async (payload, context, t, repository) => {
  const { bookingRepository } = repository;
  const bookings = await bookingRepository.getAll(payload, t);
  return bookings;
};
