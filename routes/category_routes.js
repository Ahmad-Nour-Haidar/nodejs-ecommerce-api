const {
    getCategories,
    createCategory,
    getCategory,
    updateCategory
} = require('../services/category_services')

const express = require('express');

const router = express.Router();

router.route('/')
    .get(getCategories)
    .post(createCategory);

router.route('/:id')
    .get(getCategory)
    .put(updateCategory);

module.exports = router;