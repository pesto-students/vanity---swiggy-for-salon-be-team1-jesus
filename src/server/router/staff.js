const { Router } = require('express');
const Status = require('http-status');
const { createToken } = require('../../utils/auth');

const StaffCreate = require('../../command/StaffCreate');
const StaffGetAll = require('../../assembler/StaffGetAll');

module.exports = ({ logger, database, repository, output }) => {
  const router = Router({ mergeParams: true });

  router.get('/', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.query };
      const staff = await StaffGetAll(payload, req.context, t, repository);
      await t.commit();
      if (staff.length > 0) {
        logger.info('All staffs data retrived successfully.');
        res.status(Status.OK).json(output.success(staff));
      } else {
        logger.error('Failed to retrive staffs data.');
        res.status(Status.BAD_REQUEST).json(output.fail(staff));
      }
    } catch (e) {
      await t.rollback();
      logger.error('Something went wrong!');
      next(e);
    }
  });

  router.post('/', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.body };
      const staff = await StaffCreate(payload, req.context, t, repository);
      await t.commit();
      logger.info(payload.name, 'New staff added.');
      res.status(Status.OK).json(output.success(staff));
    } catch (e) {
      await t.rollback();
      logger.error(payload.name, 'Failed to add new staff.');
      next(e);
    }
  });

  return router;
};
