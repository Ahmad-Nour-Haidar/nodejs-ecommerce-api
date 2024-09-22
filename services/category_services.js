const asyncHandler = require('express-async-handler');
const {v4: uuidv4} = require('uuid');
const sharp = require('sharp');
const {uploadSingleImage} = require('../middlewares/upload_image_middleware');


const Category = require('../models/category_model');

const factory = require('./handlers_factory');

// Upload single image
exports.uploadCategoryImage = uploadSingleImage('image');

// Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
    const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(600, 600)
        .toFormat('jpeg')
        .jpeg({quality: 95})
        .toFile(`uploads/categories/${filename}`);

    // Save image into our db
    req.body.image = filename;

    next();
});

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = factory.getAll(Category);

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
exports.getCategory = factory.getOne(Category);


// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createCategory = factory.createOne(Category);

// @desc    Update specific category
// @route   PUT /api/v1/categories/:id
// @access  Private
exports.updateCategory = factory.updateOne(Category);

// @desc    Delete specific category
// @route   DELETE /api/v1/categories/:id
// @access  Private

exports.deleteCategory = factory.deleteOne(Category);