const { Router } = require('express');
const Status = require('http-status');

const bookingCreate = require('../../command/BookingCreate');
const bookingGetAll = require('../../assembler/BookingGetAll');

module.exports = ({ logger, database, repository, output }) => {
  const router = Router({ mergeParams: true });

  router.post('/', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.body };
      const booking = await bookingCreate(payload, req.context, t, repository);
      await t.commit();
      logger.info('Salon booked successfully.');
      res.status(Status.OK).json(output.success(booking));
    } catch (e) {
      logger.error('Failed to book salon.');
      await t.rollback();
      next(e);
    }
  });

  router.get('/', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.query };
      const booking = await bookingGetAll(payload, req.context, t, repository);
      await t.commit();
      if (booking.length > 0) {
        logger.info('Salon bookings retrived successfully.');
        res.status(Status.OK).json(output.success(booking));
      } else {
        logger.info('Failed to get salon bookings.');
        res.status(Status.BAD_REQUEST).json(output.fail());
      }
    } catch (e) {
      await t.rollback();
      logger.error('Something went wrong!');
      next(e);
    }
  });

  return router;
};
