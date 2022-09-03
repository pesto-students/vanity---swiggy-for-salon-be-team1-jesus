const Payment = require('../domain/models/payments');
const CoreUtil = require('../utils/core');

module.exports = async (req, payload, context, t, repository) => {
  const { paymentRepository } = repository;
  const PID = CoreUtil.randomFTEID('PID');
  if (!PID) {
    throw new Error('payment id not generated properly!');
  }

  payload.paymentId = PID;
  const payment = new Payment(payload);
  const new_payment = await paymentRepository.add(req, payment, t);

  return new_payment;
};
