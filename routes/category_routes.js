const {
    getCategories,
    createCategory,
    getCategory
} = require('../services/category_services')

const express = require('express');

const router = express.Router();

router.route('/')
    .get(getCategories)
    .post(createCategory);

router.route('/:id')
    .get(getCategory)

module.exports = router;