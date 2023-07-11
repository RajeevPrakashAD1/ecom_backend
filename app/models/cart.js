const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true
	},
	productId: {
		type: String,
		required: true
	},
	quantity: {
		type: Number,
		default: 1
	}
});

// Define a compound index on email and productId
cartSchema.index({ email: 1, productId: 1 }, { unique: true });

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
