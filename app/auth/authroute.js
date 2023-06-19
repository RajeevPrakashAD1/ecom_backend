const express = require('express');
const router = express.Router();
const authController = require('./authctrl.js');
const authenticateUser = require('../middleware/auth.js');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/userDetails', authenticateUser, authController.userDetails);
module.exports = router;
