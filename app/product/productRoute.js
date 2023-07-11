const express = require('express');
const multer = require('multer');
const productCtrl = require('./productCtrl');

const upload = multer();

const router = express.Router();

router.post('/product/add', upload.array('uploaded_images'), productCtrl.addProduct);

router.get('/products', productCtrl.getProducts);

module.exports = router;
