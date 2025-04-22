require('dotenv').config()
const paypal = require('paypal-rest-sdk');


paypal.configure({
    mode: 'sandbox', //sandbox or live
    client_id: process.env.PAYPALCLIENTID,
    client_secret: process.env.CLIENTPAYPALSECRET
  });

  module.exports = paypal