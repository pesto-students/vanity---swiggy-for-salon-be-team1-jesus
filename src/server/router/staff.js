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
        res
          .status(Status.BAD_REQUEST)
          .json(output.fail('Failed to retrive staffs data.'));
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
      if (payload) {
        const staff = await StaffCreate(payload, req.context, t, repository);
        await t.commit();
        logger.info('New staff added.');
        res.status(Status.OK).json(output.success(staff));
      } else {
        logger.info('Failed to add new staff.');
        res
          .status(Status.BAD_REQUEST)
          .json(output.fail('Failed to add new staff.'));
      }
    } catch (e) {
      await t.rollback();
      logger.error('Something went wrong');
      next(e);
    }
  });

  return router;
};
