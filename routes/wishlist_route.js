const express = require('express');

const authService = require('../services/auth_service');

const {
    addProductToWishlist,
    removeProductFromWishlist,
    getLoggedUserWishlist,
} = require('../services/wishlist_service');

const router = express.Router();

router.use(authService.protect, authService.allowedTo('user'));

router.route('/')
    .post(addProductToWishlist)
    .get(getLoggedUserWishlist);

router.delete('/:productId', removeProductFromWishlist);

module.exports = router;