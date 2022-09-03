const { attributes } = require('structure');

const Booking = attributes({
  bookingId: { type: String, required: true, exactLength: 40 },
  bookingDate: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  serviceIds: { type: Object, required: true },
  bookingStatus: { type: String, required: true },
  paymentStatus: { type: String, required: true },
  totalAmount: { type: Number },
  staffId: { type: String, required: true },
  userId: { type: String, required: true },
  salonId: { type: String, required: true },
  userName: { type: String },
  salonName: { type: String },
  staffName: { type: String },
  serviceNames: { type: Object },
})(class booking {});

module.exports = Booking;
