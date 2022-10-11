const { config } = require('dotenv');
const express = require('express');
require('dotenv').config();

module.exports = ({ config, router, logger }) => {
  const app = express();

  app.disable('x-powered-by');
  app.use(router);
  app.use(express.json());

  return {
    app,
    start: () =>
      new Promise((resolve) => {
        const http = app.listen(process.env.PORT || 3001, () => {
          const { port } = http.address();
          console.log('I am Groot');
          console.log(`[p ${process.pid}] Listening at port  ${port}`);
          resolve(http);
        });
      }),
  };
};
