require('dotenv').config();
const nodemailer = require('nodemailer');

//Email message options
const mailOptions = {
  from: process.env.EMAIL,
  to: 'Vivekhande16sep@gmail.com',
  subject: 'Email from vanity app',
  text: 'Hello from node',
  html: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <h1>Booking Confirmed</h1>
        <p>Booking Id: AcshVcj123</p>
        <p>Booking Date: 11-02-2023</p>
      </body>
    </html>`,
};

//Email transport configuration
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_SECRET_KEY,
  },
});

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('err', error);
  } else {
    console.log('Emai send: ', info);
  }
});

// src\utils\email.js
// bphehfzuappbcoyp
