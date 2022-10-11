const { Router } = require('express');
const Status = require('http-status');

const salonCreate = require('../../command/SalonCreate');
const salonGetAll = require('../../assembler/SalonGetAll');
const salonGet = require('../../assembler/SalonGet');

module.exports = ({ logger, database, repository, output }) => {
  const router = Router({ mergeParams: true });

  router.post('/add', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.body };
      const salon = await salonCreate(payload, req.context, t, repository);
      await t.commit();
      logger.info('Salons data added successfully.');
      res.status(Status.OK).json(output.success(salon));
    } catch (e) {
      await t.rollback();
      logger.error(e);
      next(e);
    }
  });

  router.get('/', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = {
        city: req.query.city,
        bestFor: req.query.bestFor,
        rating: req.query.rating,
        services: req.query.services,
        budgetSort: req.query.budgetSort,
        ratingSort: req.query.ratingSort,
        page: req.query.page || 1,
        size: req.query.size || 10,
      };
      const { salon, pagination } = await salonGetAll(
        payload,
        req.context,
        t,
        repository
      );
      await t.commit();
      if (salon.length > 0) {
        logger.info('Salons data retrived successfully.');
        res.status(Status.OK).json(output.success(salon, pagination));
      } else {
        logger.info('Failed to get Salons data.');
        res
          .status(Status.BAD_REQUEST)
          .json(output.fail('Failed to get Salons data.'));
      }
    } catch (e) {
      await t.rollback();
      logger.error(e);
      next(e);
    }
  });

  router.get('/data', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = {
        name: req.query.name,
        page: req.query.page || 1,
        size: req.query.size || 10,
      };
      const { salon, pagination } = await salonGet(
        payload,
        req.context,
        t,
        repository
      );
      await t.commit();
      logger.info('Salons data retrived successfully.');
      res.status(Status.OK).json(output.success(salon, pagination));
    } catch (e) {
      await t.rollback();
      logger.error(e);
      next(e);
    }
  });

  return router;
};
