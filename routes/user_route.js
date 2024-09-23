const express = require('express');
const {
    getUserValidator,
    createUserValidator,
    updateUserValidator,
    deleteUserValidator,
    changeUserPasswordValidator,
} = require('../utils/validators/user_validator');

const {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
    uploadUserImage,
    resizeImage,
    changeUserPassword,
} = require('../services/user_service');

const authService = require('../services/auth_service');

const router = express.Router();

// Admin
router.put('/change-password/:id', changeUserPasswordValidator, changeUserPassword);

router
    .route('/')
    .get(
        authService.protect,
        authService.allowedTo('admin', 'manager'),
        getUsers
    )
    .post(
        authService.protect,
        authService.allowedTo('admin'),
        uploadUserImage,
        resizeImage,
        createUserValidator,
        createUser
    );

router
    .route('/:id')
    .get(
        authService.protect,
        authService.allowedTo('admin'),
        getUserValidator,
        getUser
    )
    .put(
        authService.protect,
        authService.allowedTo('admin'),
        uploadUserImage,
        resizeImage,
        updateUserValidator,
        updateUser
    )
    .delete(
        authService.protect,
        authService.allowedTo('admin'),
        deleteUserValidator,
        deleteUser
    );

module.exports = router;