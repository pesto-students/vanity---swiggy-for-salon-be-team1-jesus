const Booking = require('../domain/models/booking');
const CoreUtil = require('../utils/core');

module.exports = async (payload, context, t, repository) => {
  const { bookingRepository } = repository;
  const BID = CoreUtil.randomFTEID('BID');
  if (!BID) {
    throw new Error('booking id not generated properly!');
  }

  payload.bookingId = BID;
  const booking = new Booking(payload);
  const new_booking = await bookingRepository.add(booking, t);

  console.log('new_', new_booking);
  return new_booking;
};
