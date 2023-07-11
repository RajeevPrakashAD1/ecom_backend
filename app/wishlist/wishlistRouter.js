const express = require('express');
const router = express.Router();
const wishlistController = require('./wishlistCtrl');

// Add a product to the wishlist
router.post('/addwishlist', wishlistController.addToWishlist);

// Get all wishlist items by user email
router.post('/getwishlist', wishlistController.getWishlistItemsByUserEmail);

module.exports = router;
