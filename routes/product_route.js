const express = require('express');
const {
    getProductValidator,
    createProductValidator,
    updateProductValidator,
    deleteProductValidator,
} = require('../utils/validators/product_validator');

const {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImages,
    resizeProductImages,
} = require('../services/product_services');

const authService = require('../services/auth_service');
const reviewsRoute = require('./review_route');

const router = express.Router();

// POST   /products/jkshjhsdjh2332n/reviews
// GET    /products/jkshjhsdjh2332n/reviews
// GET    /products/jkshjhsdjh2332n/reviews/87487sfww3
router.use('/:productId/reviews', reviewsRoute);

router
    .route('/')
    .get(getProducts)
    .post(
        authService.protect,
        authService.allowedTo('admin', 'manager'), uploadProductImages,
        resizeProductImages,
        createProductValidator,
        createProduct
    );

router
    .route('/:id')
    .get(getProductValidator, getProduct)
    .put(
        authService.protect,
        authService.allowedTo('admin', 'manager'), uploadProductImages,
        updateProductValidator,
        updateProduct
    )

    .delete(
        authService.protect,
        authService.allowedTo('admin'),
        uploadProductImages,
        deleteProductValidator,
        deleteProduct
    );

module.exports = router;