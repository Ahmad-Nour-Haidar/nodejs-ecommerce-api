const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/api_error');
const ApiFeatures = require('../utils/api_features');
const Product = require('../models/product_model');

const factory = require('./handlers_factory');

// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
    const countDocuments = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .paginate(countDocuments)
        .filter()
        .search('Products')
        .limitFields()
        .sort();

    const products = await apiFeature.mongooseQuery;

    res.status(200).json({
        pagination: apiFeature.paginationResult,
        results: products.length,
        products,
    });
});

// @desc    Get specific product by id
// @route   GET /api/v1/products/:id
// @access  Public
exports.getProduct = factory.getOne(Product);


// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
exports.createProduct = factory.createOne(Product);

// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = factory.updateOne(Product);

// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private

exports.deleteProduct = factory.deleteOne(Product);