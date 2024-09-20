const {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
} = require('../utils/validators/category_validator');

const {
    getCategories,
    createCategory,
    getCategory,
    updateCategory,
    deleteCategory
} = require('../services/category_services')

const express = require('express');

const subcategoriesRoute = require('./subcategory_routes');

const router = express.Router();

router.use('/:categoryId/subcategories', subcategoriesRoute);

router.route('/')
    .get(getCategories)
    .post(createCategoryValidator, createCategory);

router.route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(updateCategoryValidator, updateCategory)
    .delete(deleteCategoryValidator, deleteCategory);

module.exports = router;