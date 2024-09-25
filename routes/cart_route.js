const express = require('express');

const {
    addProductToCart,
    getLoggedUserCart,
    removeSpecificCartItem,
    clearCart,
} = require('../services/cart_service');

const authService = require('../services/auth_service');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('user'));

router
    .route('/')
    .post(addProductToCart)
    .get(getLoggedUserCart)
    .delete(clearCart);

router
    .route('/:itemId')
    .delete(removeSpecificCartItem);

module.exports = router;