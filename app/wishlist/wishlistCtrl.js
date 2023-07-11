const Wishlist = require('../models/wishlist');

// Add a product to the wishlist
const addToWishlist = async (req, res) => {
	try {
		const { productId, userEmail } = req.body;
		console.log(productId, userEmail, req.body);
		const wishlistItem = new Wishlist({
			productId,
			userEmail
		});

		const savedWishlistItem = await wishlistItem.save();

		res.status(201).json(savedWishlistItem);
	} catch (error) {
		res.status(500).json({ error: 'Failed to add item to wishlist' });
	}
};

// Get all wishlist items by user email
const getWishlistItemsByUserEmail = async (req, res) => {
	try {
		const { userEmail } = req.body;

		const wishlistItems = await Wishlist.find({ userEmail });

		res.json(wishlistItems);
	} catch (error) {
		res.status(500).json({ error: 'Failed to get wishlist items' });
	}
};

module.exports = {
	addToWishlist,
	getWishlistItemsByUserEmail
};
