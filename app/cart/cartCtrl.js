const Cart = require('../models/cart');

// Add item to cart
const addToCart = async (req, res) => {
	try {
		const { email, productId } = req.body;

		// Create a new cart item
		const cartItem = new Cart({
			email,
			productId,
			quantity: 1
		});

		// Save the cart item to the database
		await cartItem.save();

		res.status(200).json({ success: true, message: 'Item added to cart successfully' });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

// Remove item from cart
const removeFromCart = async (req, res) => {
	try {
		const { email, productId } = req.body;

		// Find and remove the cart item based on user email and product ID
		await Cart.findOneAndRemove({ email, productId });

		res.status(200).json({ success: true, message: 'Item removed from cart successfully' });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

// Increment quantity of cart item
const incrementQuantity = async (req, res) => {
	try {
		const { email, productId } = req.body;

		// Find the cart item based on user email and product ID
		const cartItem = await Cart.findOne({ email, productId });

		if (!cartItem) {
			return res.status(404).json({ success: false, message: 'Cart item not found' });
		}

		// Increment the quantity
		cartItem.quantity += 1;

		// Save the updated cart item to the database
		await cartItem.save();

		res.status(200).json({ success: true, message: 'Quantity incremented successfully', cartItem });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

// Decrement quantity of cart item
const decrementQuantity = async (req, res) => {
	try {
		const { email, productId } = req.body;

		// Find the cart item based on user email and product ID
		const cartItem = await Cart.findOne({ email, productId });

		if (!cartItem) {
			return res.status(404).json({ success: false, message: 'Cart item not found' });
		}

		// Decrement the quantity
		if (cartItem.quantity > 1) {
			cartItem.quantity -= 1;
		} else {
			// If the quantity is 1, remove the cart item
			await Cart.findOneAndRemove({ email, productId });
			return res.status(200).json({ success: true, message: 'Cart item removed successfully' });
		}

		// Save the updated cart item to the database
		await cartItem.save();

		res.status(200).json({ success: true, message: 'Quantity decremented successfully', cartItem });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

// Retrieve cart items for a user
const getCartItems = async (req, res) => {
	try {
		const { email } = req.body;

		// Find all cart items for the user
		const cartItems = await Cart.find({ email });

		res.status(200).json({ success: true, cartItems });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
};

module.exports = {
	addToCart,
	removeFromCart,
	incrementQuantity,
	decrementQuantity,
	getCartItems
};
