const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/api_error');
const ApiFeatures = require('../utils/api_features');
const Product = require('../models/product_model');

// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
    const countDocuments = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.find(), req.query)
        .paginate(countDocuments)
        .filter()
        .search()
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
exports.getProduct = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const product = await Product.findById(id);
    if (!product) {
        return next(new ApiError(`No product for this id ${id}`, 404));
    }
    res.status(200).json({product});
});


// @desc    Create product
// @route   POST  /api/v1/products
// @access  Private
exports.createProduct = asyncHandler(async (req, res) => {

    req.body.slug = slugify(req.body.title);

    const product = await Product.create(req.body);
    res.status(201).json({product});
});

// @desc    Update specific product
// @route   PUT /api/v1/products/:id
// @access  Private
exports.updateProduct = asyncHandler(async (req, res, next) => {
    const id = req.params.id;

    if (req.body.title) {
        req.body.slug = slugify(req.body.title);
    }
    const product = await Product.findOneAndUpdate(
        {_id: id},
        req.body,
        {new: true}
    );


    if (!product) {
        return next(new ApiError(`No product for this id ${id}`, 404));
    }

    res.status(200).json({product});
});

// @desc    Delete specific product
// @route   DELETE /api/v1/products/:id
// @access  Private
exports.deleteProduct = asyncHandler(async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
        return next(new ApiError(`No product for this id ${id}`, 404));
    }
    res.status(204).send();
});