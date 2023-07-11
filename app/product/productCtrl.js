const Product = require('../models/product');

module.exports = {
	addProduct: async (req, res) => {
		try {
			const { name, qty_left, category, description, price, discount, vendorInformation, email } = req.body;
			const imageBuffers = req.files.map((file) => file.buffer); // Access the file buffers

			const product = new Product({
				name,
				email,
				qty_left,
				category,
				uploaded_images: imageBuffers, // Save the buffers in the 'images' field
				description,
				price,
				discount,
				vendorInformation
			});

			await product.save();

			res.status(200).json({ message: 'Product added successfully' });
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: 'Internal server error' });
		}
	},

	getProducts: async (req, res) => {
		try {
			const products = await Product.find();
			res.status(200).json({ success: true, data: products });
		} catch (error) {
			console.error(error);
			res.status(500).json({ success: false, error: 'Internal server error' });
		}
	}
};
