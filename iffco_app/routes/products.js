const express = require('express');
const router = express.Router();
const products = require('../controllers/products');
const catchAsync = require('../utils/catchAsync');

router.get("/", catchAsync(products.index));

module.exports = router;