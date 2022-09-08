const Booking = require('../domain/models/booking');

module.exports = async (payload, context, t, repository) => {
  const { bookingRepository } = repository;
  const booking = new Booking(payload);
  const new_booking = await bookingRepository.deleteBooking(booking, t);

  return new_booking;
};
