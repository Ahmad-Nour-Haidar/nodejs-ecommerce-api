const asyncHandler = require('express-async-handler');
const factory = require('./handlers_factory');
const ApiError = require('../utils/api_error');

const User = require('../models/user_model');
const Product = require('../models/product_model');
const Cart = require('../models/cart_model');
const Order = require('../models/order_model');

// @desc    create cash order
// @route   POST /api/v1/orders/cartId
// @access  Protected/User
exports.createCashOrder = asyncHandler(async (req, res, next) => {
    // app settings
    const taxPrice = 0;
    const shippingPrice = 0;

    // 1) Get cart depend on cartId
    const cart = await Cart.findById(req.params.cartId);

    if (!cart) {
        return next(new ApiError(`There is no such cart with id ${req.params.cartId}`, 404));
    }

    // 2) Get order price depend on cart price "Check if coupon apply"
    const cartPrice = cart.totalPriceAfterDiscount ?? cart.totalCartPrice;

    const totalOrderPrice = cartPrice + taxPrice + shippingPrice;

    // 3) Create order with default paymentMethodType cash
    const order = await Order.create({
        user: req.user._id,
        cartItems: cart.cartItems,
        shippingAddress: req.body.shippingAddress,
        totalOrderPrice,
    });

    // 4) After creating order, decrement product quantity, increment product sold
    if (!order) {
        return next(new ApiError(`There was an error in server`, 500));
    }

    const bulkOption = cart.cartItems.map((item) => ({
        updateOne: {
            filter: {_id: item.product},
            update: {$inc: {quantity: -item.quantity, sold: +item.quantity}},
        },
    }));
    await Product.bulkWrite(bulkOption, {});

    // 5) Clear cart depend on cartId
    await Cart.findByIdAndDelete(req.params.cartId);

    res.status(201).json({status: 'success', data: order});
});

exports.filterOrderForLoggedUser = asyncHandler(async (req, res, next) => {
    if (req.user.role === 'user') req.filterObj = {user: req.user._id};
    next();
});

// @desc    Get all orders
// @route   POST /api/v1/orders
// @access  Protected/User-Admin-Manager
exports.findAllOrders = factory.getAll(Order);

// @desc    Get one order
// @route   POST /api/v1/orders
// @access  Protected/User-Admin-Manager
exports.findSpecificOrder = factory.getOne(Order);