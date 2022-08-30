const { Router } = require('express');
const Status = require('http-status');

const serviceCreate = require('../../command/ServiceCreate');
const serviceGetAll = require('../../assembler/ServiceGetAll');

module.exports = ({ logger, database, repository, output }) => {
  const router = Router({ mergeParams: true });

  router.post('/', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.body };
      const service = await serviceCreate(payload, req.context, t, repository);
      await t.commit();
      logger.info('Salons service added successfully.');
      res.status(Status.OK).json(output.success(service));
    } catch (e) {
      await t.rollback();
      logger.error('Failed to add service data.');
      next(e);
    }
  });

  router.get('/', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.query };
      const service = await serviceGetAll(payload, req.context, t, repository);
      await t.commit();
      if (service.length > 0) {
        logger.info('Salons service retrived successfully.');
        res.status(Status.OK).json(output.success(service));
      } else {
        logger.info('Failed to get service data.');
        res
          .status(Status.BAD_REQUEST)
          .json(output.fail('Failed to get service data.'));
      }
    } catch (e) {
      await t.rollback();
      logger.error('Something went wrong!');
      next(e);
    }
  });

  return router;
};
