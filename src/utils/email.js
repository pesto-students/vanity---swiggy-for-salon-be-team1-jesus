require('dotenv').config();
const nodemailer = require('nodemailer');

const email = (booking) => {
  //Email message options
  const mailOptions = {
    from: process.env.EMAIL,
    to: 'Vivekhande16sep@gmail.com',
    subject: 'Vanity -- Swiggy for salons',
    text: 'Your Booking status',
    html: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <h1>Your salon appointment is Confirmed!</h1>
        <p>Booking Id: ${booking.bookingId}</p>
        <p>Booking Date: ${booking.bookingDate}</p>
        <p>Slot: ${booking.startTime} - ${booking.endTime}</p>
        <p>Amount: ${booking.totalAmount}</p>
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
};

module.exports = email;
