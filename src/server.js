const express = require('express');
const cors = require('cors');
require('dotenv').config();

const userRouter = require('./routes/userRoute');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

app.use('/api/v1/user', userRouter);

const PORT = process.env.PORT;
app.listen(PORT || 3001, () => {
  console.log(`Server started at port ${PORT}`);
});
