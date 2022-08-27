const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const catchAsync = require('../utils/catchAsync');

router.get("/", catchAsync(home.index));

module.exports = router;