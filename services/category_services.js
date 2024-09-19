const slugify = require('slugify');
const asyncHandler = require('express-async-handlr')

const Category = require('../models/category_model');

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 5;
    const skip = (page - 1) * limit;

    const categories = await Category.find({}).skip(skip).limit(limit);
    res.status(200).json({results: categories.length, page, data: categories});
});

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const category = await Category.create({name, slug: slugify(name)});
    res.status(201).json({data: category});
});