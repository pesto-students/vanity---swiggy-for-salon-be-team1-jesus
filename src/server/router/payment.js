const { Router } = require('express');
const Status = require('http-status');
const paymentCreate = require('../../command/PaymentCreate');
const { validateToken } = require('../../utils/auth');
const Razorpay = require('razorpay');
const requests = require('request');
require('dotenv').config();
const keyId = process.env.RAZOR_PAY_KEY_ID;
const keySecret = process.env.RAZOR_PAY_KEY_SECRET;

module.exports = ({ logger, database, repository, output }) => {
  const router = Router({ mergeParams: true });

  const instance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  router.get('/order', (req, res, next) => {
    try {
      const options = {
        amount: payload.paymentAmount,
        currency: 'INR',
        receipt: 'receipt#1',
        payment_capture: 1,
      };
      instance.orders.create(options, async function (err, order) {
        if (err) {
          logger.info('Something Went Wrong.');
          return res.status(500).json({
            message: 'Something Went Wrong',
          });
        }
        return res.status(200).json(order);
      });
    } catch (err) {
      logger.info('Something Went Wrong.');
      return res.status(500).json({
        message: 'Something Went Wrong',
      });
    }
  });

  router.post('/capture/:paymentId', async (req, res) => {
    try {
      const payload = { ...req.body };
      payload.userId = req.userId;
      payload.email = req.email;

      return requests(
        {
          method: 'POST',
          url: `https://${keyId}:${keySecret}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
          form: {
            amount: payload.paymentAmount,
            currency: 'INR',
          },
        },
        async function (err, response, body) {
          if (err) {
            logger.info('Payment unsuccessful.');
            return res.status(500).json({
              message: 'Something Went Wrong',
            });
          }
          console.log('response', response);
          const payment = await paymentCreate(
            req,
            payload,
            req.context,
            t,
            repository
          );
          await t.commit();
          logger.info('Salon payment added successfully.');
          res.status(Status.OK).json(output.success(payment));
        }
      );
    } catch (err) {
      logger.error(e);
      await t.rollback();
      next(e);
    }
  });

  return Router;
};
