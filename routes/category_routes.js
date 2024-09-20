const {
    getCategoryValidator,
} = require('../utils/validators/category_validator');

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
    .get(getCategoryValidator, getCategory)
    .put(updateCategory)
    .delete(deleteCategory);

module.exports = router;