const slugify = require('slugify');
const asyncHandler = require('express-async-handlr')

const Category = require('../models/category_model');

// @desc    Get list of categories
// @route   GET /api/v1/categories
// @access  Public
exports.getCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find();
    res.status(200).json({
        results: categories.length,
        categories: categories
    });
});

// @desc    Create category
// @route   POST  /api/v1/categories
// @access  Private
exports.createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const category = await Category.create({name, slug: slugify(name)});
    res.status(201).json({data: category});
});