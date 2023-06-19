const express = require('express');
const multer = require('multer');
const fs = require('fs');
const User = require('../models/user'); // Import the User model

const router = express.Router();

// Multer configuration
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, 'Profile_uploads/'); // Specify the destination folder for storing uploaded files
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname); // Use the original filename
	}
});

const upload = multer({ storage });

// Function to update user account
const updateUserAccount = async (req, res) => {
	try {
		const {
			firstName,
			lastName,
			gender,
			phoneNumber,
			email,
			country_region,
			town_city,
			street_name,
			doorno,
			state,
			pin
		} = req.body;
		//const { profile_image } = req.file;
		console.log('file', req.file, 'body', req.body);
		const filename = req.file.filename;

		// Read the image file
		const image = fs.readFileSync(req.file.path);

		// Find the user by email
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ error: 'User not found.' });
		}

		// Create an object with the updated user data
		const updatedData = {
			firstName,
			lastName,
			gender,
			phoneNumber,
			address: {
				country: country_region,
				city: town_city,
				street: street_name,
				doorNo: doorno,
				state,
				pin
			},
			profilePic: {
				data: image,
				filename
			}
		};

		// Update the user's account details
		Object.assign(user, updatedData);
		await user.save();

		res.status(200).json({ success: true, user });
	} catch (error) {
		console.error('Error updating user account:', error);
		res.status(500).json({ error: 'An error occurred while updating the account.' });
	}
};

module.exports = { updateUserAccount };
