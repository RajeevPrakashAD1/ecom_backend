// categoriesRouter.js

const express = require('express');
const router = express.Router();
const categoriesCtrl = require('./categoriesCtrl');

// Categories API endpoint
router.get('/categories', categoriesCtrl.getCategories);

// Subcategories API endpoint
router.get('/categories/:category', categoriesCtrl.getSubcategories);

module.exports = router;
