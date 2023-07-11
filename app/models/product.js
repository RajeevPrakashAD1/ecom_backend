const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	email: { type: 'string', required: true },
	name: { type: String, required: true, unique: true },
	qty_left: { type: Number, required: true },
	category: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true },
	discount: { type: Number, required: true },
	vendorInformation: { type: String }, // Add vendorInformation field
	uploaded_images: {
		type: [ Buffer ],
		required: true,
		validate: [ arrayMinLength, 'Please provide at least one image' ]
	}
});
function arrayMinLength(val) {
	return val.length > 0;
}

module.exports = mongoose.model('Product', productSchema);
