const { Router } = require('express');
const Status = require('http-status');
const paymentCreate = require('../../command/PaymentCreate');
const { validateToken } = require('../../utils/auth');

module.exports = ({ logger, database, repository, output }) => {
  const router = Router({ mergeParams: true });

  router.post('/', validateToken, async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.body };
      payload.userId = req.userId;
      payload.email = req.email;
      const payment = await paymentCreate(
        req,
        payload,
        req.context,
        t,
        repository
      );
      console.log('paymentcrt', payment);
      await t.commit();
      logger.info('Salon payment added successfully.');
      res.status(Status.OK).json(output.success(payment));
    } catch (e) {
      logger.error(e);
      await t.rollback();
      next(e);
    }
  });

  return router;
};
