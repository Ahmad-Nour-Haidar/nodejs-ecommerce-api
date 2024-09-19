const {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
} = require('../services/category_services')

const express = require('express');

const router = express.Router();

router.route('/')
    .get(getCategories)
    .post(createCategory);

router.route('/:id')
    .get(getCategory)
    .put(updateCategory)
    .delete(deleteCategory);

module.exports = router;