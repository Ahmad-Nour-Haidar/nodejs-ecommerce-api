const express = require('express');
const {
    createCashOrder,
    filterOrderForLoggedUser,
    findAllOrders,
    findSpecificOrder,
} = require('../services/order_service');

const authService = require('../services/auth_service');

const router = express.Router();

router.use(authService.protect);

router.route('/:cartId').post(authService.allowedTo('user'), createCashOrder);

router.get(
    '/',
    authService.allowedTo('user', 'admin', 'manager'),
    filterOrderForLoggedUser,
    findAllOrders
);

router.get('/:id', findSpecificOrder);

module.exports = router;