const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, 'name required'],
        },

        slug: {
            type: String,
            lowercase: true,
        },

        email: {
            type: String,
            required: [true, 'email required'],
            unique: true,
            lowercase: true,
        },
        phone: String,

        profileImg: String,

        password: {
            type: String,
            required: [true, 'password required'],
            minlength: [6, 'Too short password'],
        },

        passwordChangedAt: Date,

        passwordResetCode: String,

        passwordResetExpires: Date,

        passwordResetVerified: Boolean,

        role: {
            type: String,
            enum: ['user', 'manager', 'admin'],
            default: 'user',
        },

        active: {
            type: Boolean,
            default: true,
        },

        // child reference (one to many)
        wishlist: [
            {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
            },
        ],
    },
    {timestamps: true}
);

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        // Hashing user password
        this.password = await bcrypt.hash(this.password, 12);
    }

    next();
});

userSchema.methods.createToken = function () {
    return jwt.sign(
        {userId: this._id},
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: process.env.JWT_EXPIRE_TIME,
        },
    );
}

const User = mongoose.model('User', userSchema);

module.exports = User;