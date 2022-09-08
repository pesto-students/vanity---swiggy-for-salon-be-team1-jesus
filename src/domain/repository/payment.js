const Payment = require('../models/payments');
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports = ({ database }) => {
  const add = async (req, payment, t) => {
    const booking = await database.models.booking.findOne({
      where: { bookingId: payment.bookingId },
    });

    let session;
    try {
      session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: 'https://google.com', //`${req.protocol}://${req.get('host')}/`,
        cancel_url: 'https://facebook.com', //`${req.protocol}://${req.get('host')}/salon/book`,
        customer_email: payment.email,
        client_reference_id: booking.dataValues.bookingId,
        mode: 'payment',
        line_items: [
          {
            quantity: 1,
            price_data: {
              product: process.env.PRODUCT_KEY,
              currency: 'INR',
              unit_amount: +booking.dataValues.totalAmount * 100,
            },
          },
        ],
      });
    } catch (e) {
      return e;
    }

    const data = toDatabase(payment);
    const new_payment = await database.models.payment.create(data, {
      transaction: t,
    });

    return toDomain(new_payment);
  };

  const getAll = async (query, t) => {
    const new_payment = await database.models.payment.findAll({
      transaction: t,
    });

    let payments = new_payment.map((k) => toDomain(k));
    return payments;
  };

  const getOne = async (query, t) => {
    const new_payment = await database.models.payment.findOne({
      where: { bookingId: query.bookingId },
      transaction: t,
    });

    let payments = new_payment.map((k) => toDomain(k));
    return payments;
  };

  const toDomain = ({ dataValues }) => {
    return new Payment({
      paymentId: dataValues.paymentId,
      paymentDate: dataValues.paymentDate,
      amount: dataValues.amount,
      bookingId: dataValues.bookingId,
    });
  };

  const toDatabase = (entity) => {
    return {
      paymentId: entity.paymentId,
      paymentDate: entity.paymentDate,
      amount: entity.amount,
      bookingId: entity.bookingId,
    };
  };

  return {
    add,
    getAll,
    getOne,
  };
};
