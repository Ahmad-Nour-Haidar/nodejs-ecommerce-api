const express = require('express');

const {
    createSubCategory,
    getSubCategory,
    getSubCategories,
    updateSubCategory,
    deleteSubCategory,
    createFilterObj,
    setCategoryIdToBody,
} = require('../services/sub_category_service');
const {
    createSubCategoryValidator,
    getSubCategoryValidator,
    updateSubCategoryValidator,
    deleteSubCategoryValidator,
} = require('../utils/validators/sub_category_validator');

// mergeParams: Allow us to access parameters on other routers
// ex: We need to access categoryId from category router
const router = express.Router({mergeParams: true});

router
    .route('/')
    .post(setCategoryIdToBody, createSubCategoryValidator, createSubCategory)
    .get(createFilterObj, getSubCategories);

router
    .route('/:id')
    .get(getSubCategoryValidator, getSubCategory)
    .put(updateSubCategoryValidator, updateSubCategory)
    .delete(deleteSubCategoryValidator, deleteSubCategory);

module.exports = router;