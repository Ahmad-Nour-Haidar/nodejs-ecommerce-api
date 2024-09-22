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

const router = express.Router();

router
    .route('/')
    .get(getProducts)
    .post(uploadProductImages, resizeProductImages, createProductValidator, createProduct);

router
    .route('/:id')
    .get(getProductValidator, getProduct)
    .put(updateProductValidator, updateProduct)
    .delete(deleteProductValidator, deleteProduct);

module.exports = router;