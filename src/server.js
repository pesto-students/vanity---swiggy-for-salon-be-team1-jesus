const express = require('express');
const cor = require('./controller/corsController');
require('dotenv').config();

const usersRouter = require('./routes/usersRoute');
const salonsRouter = require('./routes/salonsRoute');

const app = express();

app.use(express.json());
app.use(cor);

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/salons', salonsRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
