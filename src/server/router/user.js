const { Router } = require('express');
const Status = require('http-status');
const { createToken } = require('../../utils/auth');

const UserCreate = require('../../command/UserCreate');
const UserLogin = require('../../command/UserLogin');
const UserGetAll = require('../../assembler/UserGetAll');

module.exports = ({ logger, database, repository, output }) => {
  const router = Router({ mergeParams: true });

  router.get('/', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = {
        parent: req.query.parent || false,
        q: req.query.q,
        page: req.query.page || 1,
        size: req.query.size || 10,
      };
      const user = await UserGetAll(payload, req.context, t, repository);
      await t.commit();
      logger.info('All users data retrived successfully.');
      res.status(Status.OK).json(output.success(user));
    } catch (e) {
      await t.rollback();
      logger.error('Failed to retrive users data.');
      next(e);
    }
  });

  router.post('/signup', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.body };
      const user = await UserCreate(payload, req.context, t, repository);
      await t.commit();
      logger.info('New User added.');
      res.status(Status.OK).json(output.success(user));
    } catch (e) {
      await t.rollback();
      logger.error('Failed to add new user.');
      next(e);
    }
  });

  router.post('/login', async (req, res, next) => {
    const t = await database.transaction();
    try {
      const payload = { ...req.body };
      const user = await UserLogin(payload, req.context, t, repository);
      await t.commit();
      logger.info('User successfully logged in. ');

      const accessToken = createToken(user);
      res.cookie('access-token', accessToken, {
        maxAge: 60 * 10 * 1000,
      });
      res.status(Status.OK).json(output.success(user));
    } catch (e) {
      await t.rollback();
      logger.error('User is not able to login.');
      next(e);
      res.status(Status.NOT_FOUND).json(output.fail());
    }
  });

  return router;
};
