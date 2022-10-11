const Status = require('http-status');

/* istanbul ignore next */
module.exports = (err, req, res, next, logger, config, output) => {
  // eslint-disable-line no-unused-vars
  logger.error(err);
  switch (err.message) {
    case 'Validation error':
      res.status(Status.BAD_REQUEST).json(
        output.fail({
          type: 'ValidationError',
          info: err.original.sqlMessage || err.message,
        })
      );
      break;
    case 'NotFoundError':
      res.status(Status.NOT_FOUND).json(
        output.fail({
          type: 'NotFoundError',
          info: err.details,
        })
      );
      break;
    case 'BadRequestError':
      res.status(Status.BAD_REQUEST).json(
        output.fail({
          type: 'BadRequestError',
          info: err.details,
        })
      );
      break;
    case 'EmailNotFound':
      res.status(Status.BAD_REQUEST).json(
        output.fail({
          type: 'NotFoundError',
          info: 'Email doesnt exixts',
        })
      );
      break;
    case 'PasswordNotMatch':
      res.status(Status.BAD_REQUEST).json(
        output.fail({
          type: 'PasswordNotMatch',
          info: 'Wrong password entered',
        })
      );
      break;
    default:
      break;
  }

  const response = Object.assign(
    {
      type: 'BadRequestError',
      info: err.message,
    },
    config.environment === 'dev' && {
      stack: err.stack,
    }
  );

  res.status(Status.BAD_REQUEST).json(output.fail(response));
};
