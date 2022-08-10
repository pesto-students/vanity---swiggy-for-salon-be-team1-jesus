const cors = require('cors');

const cor = cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
});

module.exports = cor;
