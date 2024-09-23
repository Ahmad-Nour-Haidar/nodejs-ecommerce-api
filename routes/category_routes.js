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
    deleteCategory,
    uploadCategoryImage,
    resizeImage,
} = require('../services/category_services')

const authService = require('../services/auth_service');

const express = require('express');

const subcategoriesRoute = require('./subcategory_routes');

const router = express.Router();

router.use('/:categoryId/subcategories', subcategoriesRoute);


router.route('/')
    .get(authService.protect, getCategories)
    .post(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        uploadCategoryImage,
        resizeImage,
        createCategoryValidator,
        createCategory
    );

router.route('/:id')
    .get(getCategoryValidator, getCategory)
    .put(
        authService.protect,
        authService.allowedTo('admin', 'manager'), uploadCategoryImage,
        resizeImage,
        updateCategoryValidator,
        updateCategory
    )

    .delete(
        authService.protect,
        authService.allowedTo('admin'),
        deleteCategoryValidator,
        deleteCategory
    );

module.exports = router;