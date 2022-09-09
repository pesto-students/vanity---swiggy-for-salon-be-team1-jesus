const Razorpay = require('razorpay');

const instance = new Razorpay({
  key_id: 'rzp_test_sNOBxNUNmRGlmI',
  key_secret: 'doClmZaGqstYLxZwggDcpmFX',
});

app.get('/order', (req, res) => {
  try {
    const options = {
      amount: 10 * 100,
      currency: 'INR',
      receipt: 'receipt#1',
      payment_capture: 1,
    };
    instance.orders.create(options, async function (err, order) {
      console.log('ordr', err, order);
      if (err) {
        return res.status(500).json({
          message: 'Something Went Wrong',
        });
      }
      return res.status(200).json(order);
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Something Went Wrong',
    });
  }
});

app.post('/capture/:paymentId', (req, res) => {
  const RAZOR_PAY_KEY_ID = 'rzp_test_sNOBxNUNmRGlmI';
  const RAZOR_PAY_KEY_SECRET = 'doClmZaGqstYLxZwggDcpmFX';
  try {
    console.log('req.params.paymentId', req.params.paymentId);

    return requests(
      {
        method: 'POST',
        url: `https://${RAZOR_PAY_KEY_ID}:${RAZOR_PAY_KEY_SECRET}@api.razorpay.com/v1/payments/${req.params.paymentId}/capture`,
        form: {
          amount: 10 * 100, // amount == Rs 10 // Same As Order amount
          currency: 'INR',
        },
      },
      async function (err, response, body) {
        if (err) {
          return res.status(500).json({
            message: 'Something Went Wrong',
          });
        }

        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        // console.log('Response:', body);
        return res.status(200).json(body);
      }
    );
  } catch (err) {
    // console.log('errr', err);
    return res.status(500).json({
      message: 'Something Went Wrong',
    });
  }
});
