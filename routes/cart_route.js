const express = require('express');

const {
    addProductToCart,
    getLoggedUserCart,
    removeSpecificCartItem,
} = require('../services/cart_service');

const authService = require('../services/auth_service');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('user'));

router
    .route('/')
    .post(addProductToCart)
    .get(getLoggedUserCart);

router
    .route('/:itemId')
    .delete(removeSpecificCartItem);

module.exports = router;