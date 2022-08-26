const container = require('./src/container');
const app = container.resolve('app');
let server = null;

app
  .start()
  .then((_server) => {
    server = _server;
  })
  .catch((error) => {
    console.log(error);
    process.exit();
  });
