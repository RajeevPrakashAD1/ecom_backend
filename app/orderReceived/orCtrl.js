const OrderReceived = require('../models/orderReceived');

// Create a new order received
const createOrderReceived = async (req, res) => {
	try {
		const { sellerEmail, buyerEmail, item, totalPrice } = req.body;

		const orderReceived = new OrderReceived({
			sellerEmail,
			buyerEmail,
			item,
			totalPrice
		});

		const savedOrderReceived = await orderReceived.save();

		res.status(201).json(savedOrderReceived);
	} catch (error) {
		res.status(500).json({ error: 'Failed to create order received' });
	}
};

// Get all order received by seller email
const getOrdersBySellerEmail = async (req, res) => {
	try {
		const { sellerEmail } = req.body;

		const orders = await OrderReceived.find({ sellerEmail });

		res.json(orders);
	} catch (error) {
		res.status(500).json({ error: 'Failed to get orders' });
	}
};

const getOrdersByBuyerEmail = async (req, res) => {
	try {
		const { buyerEmail } = req.body;

		const orders = await OrderReceived.find({ buyerEmail });

		res.status(200).json(orders);
	} catch (error) {
		res.status(500).json({ error: 'Failed to get orders' });
	}
};

module.exports = {
	createOrderReceived,
	getOrdersBySellerEmail,
	getOrdersByBuyerEmail
};
