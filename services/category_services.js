const slugify = require('slugify');
const asyncHandler = require('express-async-handlr')

const CategoryModel = require('../models/category_model');

const getCategories = async function getCategories(req, res) {
};

const createCategory = asyncHandler(async (req, res) => {
    const name = req.body.name;
    const category = await CategoryModel.create({name, slug: slugify(name)});
    res.status(201).json({data: category});
});

module.exports = {
    getCategories,
    createCategory,
};