const {getCategories, createCategory} = require('../services/category_services')

const express = require('express');

const router = express.Router();

router.route('/')
    .get(getCategories)
    .post(createCategory);

module.exports = router;