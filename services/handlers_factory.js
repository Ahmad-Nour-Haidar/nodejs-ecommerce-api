const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/api_error');
const ApiFeatures = require('../utils/api_features');

exports.deleteOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const {id} = req.params;
        const document = await Model.findByIdAndDelete(id);

        if (!document) {
            return next(new ApiError(`No document for this id ${id}`, 404));
        }

        res.status(204).send();
    });

exports.updateOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        if (!document) {
            return next(
                new ApiError(`No document for this id ${req.params.id}`, 404)
            );
        }
        res.status(200).json({
            [Model.modelName]: document
        });
    });

exports.createOne = (Model) =>
    asyncHandler(async (req, res) => {
        const document = await Model.create(req.body);
        res.status(201).json({[Model.modelName]: document});
    });

exports.getOne = (Model) =>
    asyncHandler(async (req, res, next) => {
        const {id} = req.params;
        const document = await Model.findById(id);
        if (!document) {
            return next(new ApiError(`No document for this id ${id}`, 404));
        }
        res.status(200).json({[Model.modelName]: document});
    });

exports.getAll = (Model, modelName = '') =>
    asyncHandler(async (req, res) => {
        let filter = {};
        if (req.filterObj) {
            filter = req.filterObj;
        }
        // Build query
        const documentsCounts = await Model.countDocuments();
        const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
            .paginate(documentsCounts)
            .search(modelName)
            .filter()
            .limitFields()
            .sort();

        // Execute query
        const {mongooseQuery, paginationResult} = apiFeatures;
        const documents = await mongooseQuery;

        res
            .status(200)
            .json({
                results: documents.length,
                paginationResult,
                [Model.modelName]: documents
            });
    });
