const mongoose = require('mongoose');

const orderReceivedSchema = new mongoose.Schema({
	sellerEmail: {
		type: String,
		required: true
	},
	// Additional order properties...
	// For example:
	buyerEmail: {
		type: String,
		required: true
	},
	item: {
		type: String,
		required: true
	},
	totalPrice: {
		type: String,
		required: true
	},
	// Timestamp for created date
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const OrderReceived = mongoose.model('OrderReceived', orderReceivedSchema);

module.exports = OrderReceived;
