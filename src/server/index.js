const express = require('express');
const cor = require('../controller/corsController');
require('dotenv').config();

// const usersRouter = require('./routes/usersRoute');
// const salonsRouter = require('./routes/salonsRoute');
// const salonServicesRouter = require('./routes/salonServicesRoute');
// const reviewsRouter = require('./routes/reviewsRouter');

// const app = express();

// app.use(express.json());
// app.use(cor);

// app.get('/', (req, res) => {
//   res.status(200).json({
//     message: 'Backend is up and running.',
//   });
// });

// app.use('/api/v1/users', usersRouter);
// app.use('/api/v1/salons', salonsRouter);
// app.use('/api/v1/salon/services', salonServicesRouter);
// app.use('/api/v1/reviews', reviewsRouter);

// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`Server started at port ${PORT}`);
// });

module.exports = ({ config, router, logger }) => {
  const app = express();

  app.disable('x-powered-by');
  app.use(router);
  app.use(express.json());
  app.use(cor);

  return {
    app,
    start: () =>
      new Promise((resolve) => {
        const http = app.listen(config.server.port, () => {
          const { port } = http.address();
          console.log('I am Groot');
          console.log(`[p ${process.pid}] Listening at port ${port}`);
          resolve(http);
        });
      }),
  };
};
