const express = require('express');

const {
    createReviewValidator,
    updateReviewValidator,
    getReviewValidator,
    deleteReviewValidator,
} = require('../utils/validators/review_validator');


const {
    getReview,
    getReviews,
    createReview,
    updateReview,
    deleteReview,
} = require('../services/review_service');

const authService = require('../services/auth_service');

const router = express.Router({mergeParams: true});

router
    .route('/')
    .get(getReviews)
    .post(
        authService.protect,
        authService.allowedTo('user'),
        createReviewValidator,
        createReview
    );

router
    .route('/:id')
    .get(
        getReviewValidator,
        getReview
    )
    .put(
        authService.protect,
        authService.allowedTo('user'),
        updateReviewValidator,
        updateReview
    )
    .delete(
        authService.protect,
        authService.allowedTo('user', 'manager', 'admin'),
        deleteReviewValidator,
        deleteReview
    );

module.exports = router;