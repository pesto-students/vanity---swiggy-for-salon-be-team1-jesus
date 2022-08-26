const { Router } = require('express');
const Status = require('http-status');

const salonCreate = require('../../command/SalonCreate');
const salonGetAll = require('../../assembler/SalonGetAll');
const salonGetFew = require('../../assembler/SalonGet');

module.exports = ({ logger, database, repository, output }) => {
  const router = Router({ mergeParams: true });

  router.post('/add', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.body };
      const salon = await salonCreate(payload, req.context, t, repository);
      await t.commit();
      res.status(Status.OK).json(output.success(salon));
    } catch (e) {
      await t.rollback();
      next(e);
    }
  });

  router.get('/', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = {
        parent: req.query.parent || false,
        q: req.query.q,
        page: req.query.page || 1,
        size: req.query.size || 10,
      };
      const salon = await salonGetAll(payload, req.context, t, repository);
      await t.commit();
      res.status(Status.OK).json(output.success(salon));
    } catch (e) {
      await t.rollback();
      next(e);
    }
  });

  router.get('/data', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.query };
      const salon = await salonGetFew(payload, req.context, t, repository);
      await t.commit();
      res.status(Status.OK).json(output.success(salon));
    } catch (e) {
      await t.rollback();
      next(e);
    }
  });

  return router;
};
