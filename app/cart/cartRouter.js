const express = require('express');
const cartController = require('./cartCtrl.js');

const router = express.Router();

// Add item to cart
router.post('/add-to-cart', cartController.addToCart);

// Remove item from cart
router.post('/remove-from-cart', cartController.removeFromCart);

// Retrieve cart items for a user
router.post('/cart-items', cartController.getCartItems);

router.post('/cart/increment', cartController.incrementQuantity);

// Decrement quantity route
router.post('/cart/decrement', cartController.decrementQuantity);

module.exports = router;
