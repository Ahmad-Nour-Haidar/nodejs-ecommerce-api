const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/api_error');
const Category = require('../models/category_model');
const ApiFeatures = require("../utils/api_features");

const factory = require('./handlers_factory');

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {

    const countDocuments = await Category.countDocuments();
    const apiFeature = new ApiFeatures(Category.find(), req.query)
        .paginate(countDocuments)
        .filter()
        .search()
        .limitFields()
        .sort();

    const categories = await apiFeature.mongooseQuery;

    res.status(200).json({
        pagination: apiFeature.paginationResult,
        results: categories.length,
        categories,
    });

});

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const category = await Category.findById(id);
    if (!category) {
        return next(new ApiError(`No category for this id ${id}`, 404));
    }
    res.status(200).json({category});
});


// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const category = await Category.create({name, slug: slugify(name)});
    res.status(201).json({data: category});
});

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = factory.updateOne(Category);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private

exports.deleteCategory = factory.deleteOne(Category);