const express = require('express');

const {
    getReview,
    getReviews,
    createReview,
    updateReview,
    deleteReview,
} = require('../services/review_service');

const authService = require('../services/auth_service');

const router = express.Router({ mergeParams: true });

router
    .route('/')
    .get(getReviews)
    .post(
        authService.protect,
        authService.allowedTo('user'),
        createReview
    );

router
    .route('/:id')
    .get(getReview)

    .put(
        authService.protect,
        authService.allowedTo('user'),
        updateReview
    )
    .delete(
        authService.protect,
        authService.allowedTo('user', 'manager', 'admin'),
        deleteReview
    );

module.exports = router;