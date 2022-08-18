const App = require('./app');
const errorHandler = require('./error');
const { partialRight } = require('ramda');
const userRouter = require('./user');

module.exports = ({ config, database, logger, repository, output }) => {
  app = App({ config, repository });

  app.use(async function authContext(req, res, next) {
    next();
  });

  app.get('/', (req, res) => {
    res.status(200).json({
      message: 'Backend is up and running',
    });
  });

  app.use(
    '/api/v1/user',
    userRouter({ logger, database, repository, output, config })
  );

  app.use(function notFound(req, res, next) {
    res.status(404).send();
  });

  app.use(partialRight(errorHandler, [logger, config, output]));

  return app;
};
