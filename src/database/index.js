const DB = require('./db_func');

module.exports = ({ config, logger }) => {
  //Read database config variables
  if (!config.mysqlConfig) {
    logger.error('Database config file log not found, disabling database.');
    process.exit(1);
  }

  const db = DB(config.mysqlConfig, logger);

  return db;
};
