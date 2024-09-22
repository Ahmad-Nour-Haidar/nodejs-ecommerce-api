const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/api_error');

const SubCategory = require('../models/sub_category_model');

const ApiFeatures = require("../utils/api_features");

const factory = require('./handlers_factory');

exports.setCategoryIdToBody = (req, res, next) => {
    // Nested route
    if (!req.body.category) req.body.category = req.params.categoryId;
    next();
};

// Nested route
// GET /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
    let filterObject = {};
    if (req.params.categoryId) filterObject = {category: req.params.categoryId};
    req.filterObj = filterObject;
    next();
};

// @desc    Get list of subcategories
// @route   GET /api/v1/subcategories
// @access  Public
exports.getSubCategories = asyncHandler(async (req, res) => {

    const countDocuments = await SubCategory.countDocuments();
    const apiFeature = new ApiFeatures(SubCategory.find(), req.query)
        .paginate(countDocuments)
        .search()
        .filter()
        .limitFields()
        .sort();

    const subCategories = await apiFeature.mongooseQuery;

    res.status(200).json({
        pagination: apiFeature.paginationResult,
        results: subCategories.length,
        subCategories,
    });

});

// @desc    Get specific subcategory by id
// @route   GET /api/v1/subcategories/:id
// @access  Public
exports.getSubCategory = factory.getOne(SubCategory);

// @desc    Create subCategory
// @route   POST  /api/v1/subcategories
// @access  Private
exports.createSubCategory = factory.createOne(SubCategory);

// @desc    Update specific subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = factory.updateOne(SubCategory);
// @desc    Delete specific subCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private

exports.deleteSubCategory = factory.deleteOne(SubCategory);