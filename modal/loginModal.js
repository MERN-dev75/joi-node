import mongoose from 'mongoose'
import Joi from 'joi';

// Joi validation schema
const userValidationSchema = Joi.object({
    username: Joi.string().trim().required().max(30).messages({
        'string.empty': 'Username is required',
        'string.max': 'Username should not exceed 30 characters',
    }),
    email: Joi.string().email().required().lowercase().messages({
        'string.empty': 'Email is required',
        'string.email': 'Invalid email format',
    }),
    password: Joi.string().required().min(8).messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 8 characters long',
    }),
    refreshToken: Joi.string().allow(null),
});

const loginValidationSchema = Joi.object({
    username: Joi.string().trim().required().max(30).messages({
        'string.empty': 'Username is required',
        'string.max': 'Username should not exceed 30 characters',
    }),
    password: Joi.string().required().messages({
      'string.empty': 'Password is required',
    }),
  });

// Validation function
export const validateUser = (data) => {
    return userValidationSchema.validate(data);
};
export const loginvalidateUser = (data) => {
    return loginValidationSchema.validate(data);
};

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        // match: [/\S+@\S+\.\S+/, "Invalid email format"],
    },
    password: {
        type: String,
        require: true,
        // minlength: 8
    },
    refreshToken: {
        type: String, // Token for password reset
        default: null,
    },
},
    {
        timestamps: true
    });

const Users = mongoose.model("User", userSchema);

export default Users;