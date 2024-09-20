const {check} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validator_middleware');

exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id format'),
    validatorMiddleware,
];
