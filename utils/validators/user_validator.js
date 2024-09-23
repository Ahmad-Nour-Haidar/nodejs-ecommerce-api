const slugify = require('slugify');
const bcrypt = require('bcryptjs');
const {check, body} = require('express-validator');
const validatorMiddleware = require('../../middlewares/validator_middleware');
const User = require('../../models/user_model');

exports.createUserValidator = [
    check('name')
        .notEmpty()
        .withMessage('User required')
        .isLength({min: 3})
        .withMessage('Too short User name')
        .custom((val, {req}) => {
            req.body.slug = slugify(val);
            return true;
        }),

    check('email')
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address')
        .custom((val) =>
            User.findOne({email: val}).then((user) => {
                if (user) {
                    return Promise.reject(new Error('E-mail already in user'));
                }
            })
        ),

    check('password')
        .notEmpty()
        .withMessage('Password required')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters')
        .custom((password, {req}) => {
            if (password !== req.body.passwordConfirm) {
                throw new Error('Password Confirmation incorrect');
            }
            return true;
        }),

    check('passwordConfirm')
        .notEmpty()
        .withMessage('Password confirmation required'),


    check('phone')
        .optional()
        .isMobilePhone(['ar-EG', 'ar-SA', 'ar-SY'])
        .withMessage('Invalid phone number only accepted EG , SA and SY Phone numbers'),

    check('profileImg').optional(),

    check('role').optional(),

    validatorMiddleware,
];

exports.getUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    validatorMiddleware,
];

exports.updateUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),

    check('name')
        .optional()
        .notEmpty()
        .withMessage('User required')
        .isLength({min: 3})
        .withMessage('Too short User name')
        .custom((val, {req}) => {
            req.body.slug = slugify(val);
            return true;
        }),

    check('email')
        .optional()
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage('Invalid email address')
        .custom((val) =>
            User.findOne({email: val}).then((user) => {
                if (user) {
                    return Promise.reject(new Error('E-mail already in user'));
                }
            })
        ),

    check('password')
        .optional()
        .notEmpty()
        .withMessage('Password required')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters'),

    check('phone')
        .optional()
        .optional()
        .isMobilePhone(['ar-EG', 'ar-SA', 'ar-SY'])
        .withMessage('Invalid phone number only accepted EG , SA and SY Phone numbers'),

    check('profileImg').optional(),

    check('role').optional(),

    validatorMiddleware,
];

exports.changeUserPasswordValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),

    body('currentPassword')
        .notEmpty()
        .withMessage('You must enter your current password'),

    body('passwordConfirm')
        .notEmpty()
        .withMessage('You must enter the password confirm'),

    body('password')
        .notEmpty()
        .withMessage('You must enter new password')
        .custom(async (val, {req}) => {
            // 1) Verify current password
            const user = await User.findById(req.params.id);
            if (!user) {
                throw new Error('There is no user for this id');
            }
            const isCorrectPassword = await bcrypt.compare(
                req.body.currentPassword,
                user.password
            );
            if (!isCorrectPassword) {
                throw new Error('Incorrect current password');
            }

            // 2) Verify password confirm
            if (val !== req.body.passwordConfirm) {
                throw new Error('Password Confirmation incorrect');
            }
            return true;
        }),

    validatorMiddleware,
];

exports.deleteUserValidator = [
    check('id').isMongoId().withMessage('Invalid User id format'),
    validatorMiddleware,
];
