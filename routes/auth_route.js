const express = require('express');

const {
    signupValidator,
} = require('../utils/validators/auth_validator');

const {
    signup,
} = require('../services/auth_service');

const router = express.Router();

router.post('/signup', signupValidator, signup);

module.exports = router;