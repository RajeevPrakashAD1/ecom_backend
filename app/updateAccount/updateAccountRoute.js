const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { updateUserAccount } = require('./updateAccountCtrl.js');
const authenticateUser = require('../middleware/auth.js');

const router = express.Router();
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './Profile_uploads/'); // Specify the destination folder for storing uploaded files
	},
	filename: function(req, file, cb) {
		cb(null, file.originalname); // Use the original filename
	}
});

const upload = multer({ storage });

// Routes
router.post('/updateAccount', upload.single('profile_image'), updateUserAccount);

module.exports = router;
