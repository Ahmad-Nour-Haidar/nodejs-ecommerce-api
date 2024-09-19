const {getCategories} = require('../services/category_services')

const express = require('express');

const router = express.Router();

router.get('/', getCategories);

module.exports = router;