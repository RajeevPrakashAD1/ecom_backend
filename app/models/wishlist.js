const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
	productId: {
		type: String,
		required: true
	},
	userEmail: {
		type: String,
		required: true
	}
});

// Create a custom validator to check uniqueness of the combination of 'userEmail' and 'productId'
wishlistSchema.path('userEmail').validate(async function(value) {
	const wishlist = await mongoose.models.Wishlist.findOne({
		userEmail: value,
		productId: this.productId
	});

	return !wishlist; // Return false if a wishlist item with the same combination exists
}, 'Wishlist item already exists for the given user and product.');

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
