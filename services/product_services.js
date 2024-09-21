const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/api_error');
const Product = require('../models/product_model');

// @desc    Get list of products
// @route   GET /api/v1/products
// @access  Public
exports.getProducts = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    const products = await Product.find().skip(skip).limit(limit);

    res.status(200).json({results: products.length, page, products});
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

    req.body.slug = slugify(req.body.title);

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