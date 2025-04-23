const express = require('express');
const { createOrder, capturePayment, getAllOrdersbyUser, getOrderDetails } = require('./orderController');

const router = express.Router();

router.post('/create', createOrder);
router.post('/capture', capturePayment);
router.get('/list/:userId',getAllOrdersbyUser)
router.get('/details/:id', getOrderDetails)


module.exports = router