const express = require('express');
const {
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator,
} = require('../utils/validators/brand_validator');

const {
    getBrands,
    getBrand,
    createBrand,
    updateBrand,
    deleteBrand,
    uploadBrandImage,
    resizeImage,
} = require('../services/brand_service');

const authService = require('../services/auth_service');

const router = express.Router();

router
    .route('/')
    .get(getBrands)
    .post(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        uploadBrandImage,
        resizeImage,
        createBrandValidator,
        createBrand
    );

router
    .route('/:id')
    .get(getBrandValidator, getBrand)
    .put(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        uploadBrandImage,
        resizeImage,
        updateBrandValidator,
        updateBrand)

    .delete(
        authService.protect,
        authService.allowedTo('admin'),
        deleteBrandValidator,
        deleteBrand
    );

module.exports = router;