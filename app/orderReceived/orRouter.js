const express = require('express');
const router = express.Router();
const orderReceivedController = require('./orCtrl');

// Create a new order received
router.post('/order', orderReceivedController.createOrderReceived);

// Get all order received by seller email
router.post('/merchantorder', orderReceivedController.getOrdersBySellerEmail);
router.post('/customerorder', orderReceivedController.getOrdersByBuyerEmail);

module.exports = router;
