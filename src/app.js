module.exports = ({ server, database, config, logger }) => {
  return {
    logger: logger,
    //First connect database then start the node server
    start: () => Promise.resolve().then(database.connect).then(server.start),
  };
};
