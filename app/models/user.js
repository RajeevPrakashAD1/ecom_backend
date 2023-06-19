const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	gender: {
		type: String
	},
	phoneNumber: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	address: {
		country: String,
		city: String,
		street: String,
		doorNo: String,
		state: String,
		pin: String
	},
	type: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	profilePic: {
		data: Buffer, // Binary data of the image
		filename: String // Filename of the image
	}
});

const User = mongoose.model('User', userSchema);

module.exports = User;
