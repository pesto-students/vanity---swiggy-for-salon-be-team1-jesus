const { Router } = require('express');
const Status = require('http-status');

const { validateToken } = require('../../utils/auth');
const bookingCreate = require('../../command/BookingCreate');
const bookingGetAll = require('../../assembler/BookingGetAll');
const bookingUpdate = require('../../command/BookingUpdate');
const bookingDelete = require('../../command/BookingDelete');

module.exports = ({ logger, database, repository, output }) => {
  const router = Router({ mergeParams: true });

  router.post('/', validateToken, async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.body };
      payload.userId = req.userId;
      const booking = await bookingCreate(payload, req.context, t, repository);
      await t.commit();

      if (typeof booking == 'string') {
        logger.info(booking);
        res.status(Status.NOT_IMPLEMENTED).json(output.fail(booking));
      } else {
        logger.info('Salon booked successfully.');
        res.status(Status.OK).json(output.success(booking));
      }
    } catch (e) {
      logger.error('Failed to book salon.');
      await t.rollback();
      next(e);
    }
  });

  router.get('/', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = {
        userId: req.query.userId,
        salonId: req.query.salonId,
        page: req.query.page || 1,
        size: req.query.size || 10,
      };
      const { booking, pagination } = await bookingGetAll(
        payload,
        req.context,
        t,
        repository
      );
      await t.commit();
      if (booking.length > 0) {
        logger.info('Salon bookings retrived successfully.');
        res.status(Status.OK).json(output.success(booking, pagination));
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

  router.patch('/', validateToken, async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.body };
      payload.userId = req.userId;
      const booking = await bookingUpdate(payload, req.context, t, repository);
      await t.commit();

      if (typeof booking == 'string') {
        logger.info(booking);
        res.status(Status.NOT_IMPLEMENTED).json(output.fail(booking));
      } else {
        logger.info('Booking updated successfully.');
        res.status(Status.OK).json(output.success(booking));
      }
    } catch (e) {
      logger.error('Something went wrong!');
      await t.rollback();
      next(e);
    }
  });

  router.delete('/', validateToken, async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.query };
      payload.userId = req.userId;
      const booking = await bookingDelete(payload, req.context, t, repository);
      await t.commit();

      if (typeof booking == 'string') {
        logger.info(booking);
        res.status(Status.NOT_IMPLEMENTED).json(output.fail(booking));
      } else {
        logger.info('Booking deleted successfully.');
        res.status(Status.OK).json(output.success(booking));
      }
    } catch (e) {
      logger.error(e);
      await t.rollback();
      next(e);
    }
  });

  return router;
};
