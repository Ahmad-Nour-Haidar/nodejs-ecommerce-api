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