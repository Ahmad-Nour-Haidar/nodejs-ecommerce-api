const multer = require('multer');
const ApiError = require('../utils/api_error');

const multerOptions = () => {

    const multerStorage = multer.memoryStorage();

    const multerFilter = function (req, file, cb) {
        if (file.mimetype.startsWith('image')) {
            cb(null, true);
        } else {
            cb(new ApiError('Only Images allowed', 400), false);
        }
    };

    return multer({storage: multerStorage, fileFilter: multerFilter});
};

exports.uploadSingleImage = (fieldName) => multerOptions().single(fieldName);