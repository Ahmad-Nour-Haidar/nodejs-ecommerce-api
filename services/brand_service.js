const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/api_error');

const Brand = require('../models/brand_model');
const ApiFeatures = require("../utils/api_features");

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
exports.getBrand = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const brand = await Brand.findById(id);
    if (!brand) {
        return next(new ApiError(`No brand for this id ${id}`, 404));
    }
    res.status(200).json({data: brand});
});

// @desc    Create brand
// @route   POST  /api/v1/brands
// @access  Private
exports.createBrand = asyncHandler(async (req, res) => {
    const {name} = req.body;
    const brand = await Brand.create({name, slug: slugify(name)});
    res.status(201).json({data: brand});
});

// @desc    Update specific brand
// @route   PUT /api/v1/brands/:id
// @access  Private
exports.updateBrand = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const {name} = req.body;

    const brand = await Brand.findOneAndUpdate(
        {_id: id},
        {name, slug: slugify(name)},
        {new: true}
    );

    if (!brand) {
        return next(new ApiError(`No brand for this id ${id}`, 404));
    }
    res.status(200).json({data: brand});
});

// @desc    Delete specific brand
// @route   DELETE /api/v1/brands/:id
// @access  Private
exports.deleteBrand = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const brand = await Brand.findByIdAndDelete(id);

    if (!brand) {
        return next(new ApiError(`No brand for this id ${id}`, 404));
    }
    res.status(204).send();
});