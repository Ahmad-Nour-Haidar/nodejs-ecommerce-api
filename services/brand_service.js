const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/api_error');

const Brand = require('../models/brand_model');
const ApiFeatures = require("../utils/api_features");

const factory = require('./handlers_factory');

// @desc    Get list of brands
// @route   GET /api/v1/brands
// @access  Public
exports.getBrands = asyncHandler(async (req, res) => {

    const countDocuments = await Brand.countDocuments();
    const apiFeature = new ApiFeatures(Brand.find(), req.query)
        .paginate(countDocuments)
        .filter()
        .search()
        .limitFields()
        .sort();

    const brands = await apiFeature.mongooseQuery;

    res.status(200).json({
        pagination: apiFeature.paginationResult,
        results: brands.length,
        brands,
    });

});

// @desc    Get specific brand by id
// @route   GET /api/v1/brands/:id
// @access  Public
exports.getBrand = factory.getOne(Brand);

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.createBrand = factory.createOne(Brand);

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = factory.updateOne(Brand);

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private

exports.deleteBrand = factory.deleteOne(Brand);