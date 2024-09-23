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

const router = express.Router();

// Admin
router.put('/change-password/:id', changeUserPasswordValidator, changeUserPassword);

router
    .route('/')
    .get(getUsers)
    .post(uploadUserImage, resizeImage, createUserValidator, createUser);

router
    .route('/:id')
    .get(getUserValidator, getUser)
    .put(uploadUserImage, resizeImage, updateUserValidator, updateUser)
    .delete(deleteUserValidator, deleteUser);

module.exports = router;