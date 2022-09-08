const { attributes } = require('structure');

//Booking payment data validation
const Payment = attributes({
  paymentId: { type: String, required: true, exactLength: 40 },
  paymentDate: { type: String, required: true },
  amount: { type: Number },
  bookingId: { type: String, required: true },
})(class Payment {});

module.exports = Payment;
