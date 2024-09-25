const asyncHandler = require('express-async-handler');
const ApiError = require('../utils/api_error');

const Product = require('../models/product_model');
const Coupon = require('../models/coupon_model');
const Cart = require('../models/cart_model');

const calcTotalCartPrice = (cart) => {
    let totalPrice = 0;
    cart.cartItems.forEach((item) => {
        totalPrice += item.quantity * item.price;
    });

    cart.totalCartPrice = totalPrice;

    return totalPrice;
};

// @desc    Add product to cart
// @route   POST /api/v1/cart
// @access  Private/User
exports.addProductToCart = asyncHandler(async (req, res, next) => {
    const {productId, color} = req.body;
    const product = await Product.findById(productId);

    // 1) Get Cart for logged user
    let cart = await Cart.findOne({user: req.user._id});

    if (!cart) {
        // create cart fot logged user with product
        cart = await Cart.create({
            user: req.user._id,
            cartItems: [{product: productId, color, price: product.price}],
        });
    } else {
        // product exist in cart, update product quantity
        const productIndex = cart.cartItems.findIndex(
            (item) => item.product.toString() === productId && item.color === color
        );

        if (productIndex > -1) {
            const cartItem = cart.cartItems[productIndex];
            cartItem.quantity += 1;

            cart.cartItems[productIndex] = cartItem;
        } else {
            // product not exist in cart,  push product to cartItems array
            cart.cartItems.push({product: productId, color, price: product.price});
        }
    }

    // Calculate total cart price
    calcTotalCartPrice(cart);

    await cart.save();

    res.status(200).json({
        status: 'success',
        message: 'Product added to cart successfully',
        num_of_cart_items: cart.cartItems.length,
        cart,
    });
});

// @desc    Get logged user cart
// @route   GET /api/v1/cart
// @access  Private/User
exports.getLoggedUserCart = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findOne({user: req.user._id});

    if (!cart) {
        return next(
            new ApiError(`There is no cart for this user id : ${req.user._id}`, 404)
        );
    }

    res.status(200).json({
        status: 'success',
        num_of_cart_items: cart.cartItems.length,
        cart,
    });
});

// @desc    Remove specific cart item
// @route   DELETE /api/v1/cart/:itemId
// @access  Private/User
exports.removeSpecificCartItem = asyncHandler(async (req, res, next) => {
    const cart = await Cart.findOneAndUpdate(
        {user: req.user._id},
        {
            $pull: {cartItems: {_id: req.params.itemId}},
        },
        {new: true}
    );

    calcTotalCartPrice(cart);
    cart.save();

    res.status(200).json({
        status: 'success',
        num_of_cart_items: cart.cartItems.length,
        cart,
    });
});