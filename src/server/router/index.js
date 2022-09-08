const App = require('./app');
const errorHandler = require('./error');
const { partialRight } = require('ramda');
const userRouter = require('./user');
const salonRouter = require('./salon');
const salonServiceRouter = require('./service');
const salonReviewRouter = require('./review');
const salonStaffRouter = require('./staff');
const salonBookingRouter = require('./book');
const paymentRouter = require('./payment');

module.exports = ({ config, database, logger, repository, output }) => {
  const app = App({ config, repository });

  app.use(async function authContext(req, res, next) {
    next();
  });

  app.use(
    '/api/v1/user',
    userRouter({ logger, database, repository, output, config })
  );

  app.use(
    '/api/v1/salon',
    salonRouter({ logger, database, repository, output, config })
  );

  app.use(
    '/api/v1/salon/service',
    salonServiceRouter({ logger, database, repository, output, config })
  );

  app.use(
    '/api/v1/salon/review',
    salonReviewRouter({ logger, database, repository, output, config })
  );

  app.use(
    '/api/v1/salon/staff',
    salonStaffRouter({ logger, database, repository, output, config })
  );

  app.use(
    '/api/v1/salon/book',
    salonBookingRouter({ logger, database, repository, output, config })
  );

  app.use(
    '/api/v1/payment',
    paymentRouter({ logger, database, repository, output, config })
  );

  app.use(function notFound(req, res, next) {
    res.status(404).send();
  });

  app.use(partialRight(errorHandler, [logger, config, output]));

  return app;
};
