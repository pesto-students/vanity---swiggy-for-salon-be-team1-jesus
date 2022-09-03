const { Router } = require('express');
const Status = require('http-status');

const reviewCreate = require('../../command/ReviewCreate');
const reviewGetAll = require('../../assembler/ReviewGetAll');
// const { validateToken } = require('../../utils/auth');

module.exports = ({ logger, database, repository, output }) => {
  const router = Router({ mergeParams: true });

  router.post('/', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.body };
      const review = await reviewCreate(payload, req.context, t, repository);
      console.log('rev', review);
      await t.commit();
      logger.info('Salon review added successfully.');
      res.status(Status.OK).json(output.success(review));
    } catch (e) {
      logger.error(e);
      await t.rollback();
      next(e);
    }
  });

  router.get('/', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.query };
      const review = await reviewGetAll(payload, req.context, t, repository);
      await t.commit();
      if (review.length > 0) {
        logger.info('Salon review retrived successfully.');
        res.status(Status.OK).json(output.success(review));
      } else {
        logger.info('Failed to get all reviews.');
        res
          .status(Status.BAD_REQUEST)
          .json(output.fail('Failed to get all reviews.'));
      }
    } catch (e) {
      await t.rollback();
      logger.error(e);
      next(e);
    }
  });

  return router;
};
