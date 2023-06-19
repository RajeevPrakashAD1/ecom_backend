const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

const signup = async (req, res) => {
	try {
		const { email, password, type, lastName, firstName, phoneNumber } = req.body;

		// Check if user with the same username or email already exists
		const existingUser = await User.findOne({ email: email });
		//conosle.log('eu', existingUser);
		if (existingUser) {
			return res.status(409).json({ error: 'Username or email already exists' });
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create a new user
		const newUser = new User({ email, password: hashedPassword, type, firstName, lastName, type, phoneNumber });
		await newUser.save();

		res.status(201).json({ success: true, message: 'Signup successful' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		// Check if the user exists
		const user = await User.findOne({ email });
		//console.log('user', user);
		if (!user) {
			return res.status(401).json({ error: 'Invalid username or password' });
		}

		// Compare the password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ error: 'Invalid username or password' });
		}

		// Generate a JWT token
		const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '100d' });

		res.status(200).json({
			success: true,
			message: 'Login successful',
			token: token,
			user: user
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
	}
};

const userDetails = async (req, res) => {
	const email = req.user.email;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(404).json({ error: 'User not found' });
		}

		// Return user details
		res.json({
			success: true,
			user
		});
	} catch (error) {
		console.error('Error fetching user details:', error);
		res.status(500).json({ error: 'Internal server error' });
	}
};

module.exports = {
	signup,
	login,
	userDetails
};
