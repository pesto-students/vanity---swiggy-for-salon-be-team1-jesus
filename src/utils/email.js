require('dotenv').config();
const nodemailer = require('nodemailer');

const email = ({ dataValues }) => {
  //Email message options
  const mailOptions = {
    from: process.env.EMAIL,
    to: 'aryanishthaa@gmail.com',
    subject: 'Vanity -- Swiggy for salons',
    text: 'Your Booking status',
    html: `<!doctype html>
    <html ⚡4email>
      <head>
        <meta charset="utf-8">
      </head>
      <body>
        <h1>Your salon appointment is Confirmed!</h1>
        <p>Booking Id: ${dataValues.bookingId}</p>
        <p>Salon name: ${dataValues.salonName}</p>
        <p>Booking Date: ${dataValues.bookingDate}</p>
        <p>Slot: ${dataValues.startTime} - ${dataValues.endTime}</p>
        <p>Amount: ${dataValues.totalAmount}</p>
        <p>Selected services: ${dataValues.svc[0]}</p>
        <p>Stylist: ${dataValues.staffName}</p> 
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
      throw new Error(error);
    }
  });
};

module.exports = email;
