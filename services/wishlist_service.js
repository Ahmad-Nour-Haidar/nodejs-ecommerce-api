const asyncHandler = require('express-async-handler');

const User = require('../models/user_model');

// @desc    Add product to wishlist
// @route   POST /api/v1/wishlist
// @access  Protected/User
exports.addProductToWishlist = asyncHandler(async (req, res, next) => {
    // $addToSet => add productId to wishlist array if productId not exist
    const user = await User.findByIdAndUpdate(
        req.user._id,
        {
            $addToSet: {wishlist: req.body.productId},
        },
        {new: true}
    );

    res.status(200).json({
        status: 'success',
        message: 'Product added successfully to your wishlist.',
        wishlist: user.wishlist,
    });
});