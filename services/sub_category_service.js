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

    // const s = await SubCategory.find({name: {$regex: 'Foods', $options: 'i'}});
    //
    // return res.status(200).json({
    //     s
    // });

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
exports.getSubCategory = asyncHandler(async (req, res, next) => {
    const {id} = req.params;
    const subCategory = await SubCategory.findById(id)
        .populate({path: 'category', select: 'name -_id'});


    if (!subCategory) {
        return next(new ApiError(`No subcategory for this id ${id}`, 404));
    }
    res.status(200).json({data: subCategory});
})

// @desc    Create subCategory
// @route   POST  /api/v1/subcategories
// @access  Private
exports.createSubCategory = asyncHandler(async (req, res) => {
    const {name, category} = req.body;
    const subCategory = await SubCategory.create({
        name,
        slug: slugify(name),
        category,
    });
    res.status(201).json({data: subCategory});
});

// @desc    Update specific subcategory
// @route   PUT /api/v1/subcategories/:id
// @access  Private
exports.updateSubCategory = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const {name, category} = req.body;

    const subCategory = await SubCategory.findOneAndUpdate(
        {_id: id},
        {name, slug: slugify(name), category},
        {new: true}
    );


    res.status(200).json({data: subCategory});
});

// @desc    Delete specific subCategory
// @route   DELETE /api/v1/subcategories/:id
// @access  Private

exports.deleteBrand = factory.deleteOne(SubCategory);