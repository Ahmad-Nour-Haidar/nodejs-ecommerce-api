const express = require('express');

const {
    addProductToCart,
    getLoggedUserCart,
} = require('../services/cart_service');

const authService = require('../services/auth_service');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('user'));

router
    .route('/')
    .post(addProductToCart)
    .get(getLoggedUserCart);

module.exports = router;