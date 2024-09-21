const slugify = require('slugify');
const {check, body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validator_middleware');

exports.createProductValidator = [
    check('title')
        .isLength({min: 3})
        .withMessage('must be at least 3 chars')
        .notEmpty()
        .withMessage('Product required')
        .custom((val, {req}) => {
            req.body.slug = slugify(val);
            return true;
        }),

    check('description')
        .notEmpty()
        .withMessage('Product description is required')
        .isLength({max: 2000})
        .withMessage('Too long description'),

    check('quantity')
        .notEmpty()
        .withMessage('Product quantity is required')
        .isNumeric()
        .withMessage('Product quantity must be a number'),

    check('sold')
        .optional()
        .isNumeric()
        .withMessage('Product quantity must be a number'),

    check('price')
        .notEmpty()
        .withMessage('Product price is required')
        .isNumeric()
        .withMessage('Product price must be a number')
        .isLength({max: 32})
        .withMessage('To long price'),

    check('priceAfterDiscount')
        .optional()
        .isNumeric()
        .withMessage('Product priceAfterDiscount must be a number')
        .toFloat()
        .custom((value, {req}) => {
            if (req.body.price <= value) {
                throw new Error('priceAfterDiscount must be lower than price');
            }
            return true;
        }),

    check('colors')
        .optional()
        .isArray()
        .withMessage('availableColors should be array of string'),

    check('imageCover').notEmpty().withMessage('Product imageCover is required'),

    check('images')
        .optional()
        .isArray()
        .withMessage('images should be array of string'),

    check('category')
        .notEmpty()
        .withMessage('Product must be belong to a category')
        .isMongoId()
        .withMessage('Invalid ID format'),

    check('subcategories')
        .optional()
        .isMongoId()
        .withMessage('Invalid ID format'),

    check('brand').optional().isMongoId().withMessage('Invalid ID format'),

    check('ratingsAverage')
        .optional()
        .isNumeric()
        .withMessage('ratingsAverage must be a number')
        .isLength({min: 1})
        .withMessage('Rating must be above or equal 1.0')
        .isLength({max: 5})
        .withMessage('Rating must be below or equal 5.0'),

    check('ratingsQuantity')
        .optional()
        .isNumeric()
        .withMessage('ratingsQuantity must be a number'),

    validatorMiddleware,
];

exports.getProductValidator = [
    check('id').isMongoId().withMessage('Invalid ID format'),
    validatorMiddleware,
];

exports.updateProductValidator = [
    check('id').isMongoId().withMessage('Invalid ID format'),
    body('title')
        .optional()
        .custom((val, {req}) => {
            req.body.slug = slugify(val);
            return true;
        }),
    validatorMiddleware,
];

exports.deleteProductValidator = [
    check('id').isMongoId().withMessage('Invalid ID format'),
    validatorMiddleware,
];