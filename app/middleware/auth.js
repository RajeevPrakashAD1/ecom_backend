// middleware/auth.js
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
	// Extract the token from the request header, query string, or cookie
	let token = req.header('Authorization');
	if (token) {
		token = token.replace('Bearer ', '');
	} else {
		token = req.query.token || req.cookies.token;
	}

	if (!token) {
		return res.status(401).json({ error: 'Authentication required' });
	}

	try {
		// Verify and decode the token
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// Attach the user ID to the request object
		req.user = { email: decoded.email };

		next();
	} catch (error) {
		return res.status(401).json({ error: 'Invalid token' });
	}
};

module.exports = authenticateUser;
