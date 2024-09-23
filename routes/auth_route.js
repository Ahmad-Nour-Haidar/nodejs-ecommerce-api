const express = require('express');

const {
    signupValidator,
    loginValidator
} = require('../utils/validators/auth_validator');

const {
    signup,
    login,
    forgotPassword,
} = require('../services/auth_service');

const router = express.Router();

router.post('/signup', signupValidator, signup);
router.post('/login', loginValidator, login);
router.post('/forgot-password', forgotPassword);

module.exports = router;