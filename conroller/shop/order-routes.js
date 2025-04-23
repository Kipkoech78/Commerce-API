const express = require('express');
const { createOrder, capturePayment, getAllOrdersbyUser, getOrderDetails } = require('./orderController');
const { getAllUserOrders, updateOrderStatus } = require('../auth/admin/order-controller');

const router = express.Router();

router.post('/create', createOrder);
router.post('/capture', capturePayment);
router.get('/list/:userId',getAllOrdersbyUser)
router.get('/details/:id', getOrderDetails)

router.get('/admin/orders/', getAllUserOrders)
router.put('/admin/update/:id', updateOrderStatus)


module.exports = router