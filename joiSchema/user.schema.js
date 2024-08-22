const Joi = require('joi');

const PASSWORD_REGEX = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!.@#$%^&*])(?=.{8,})"
);

const userRegSchema = Joi.object({
    firstname: Joi.string().required().messages({
        'string.base': `"firstname" should be a type of 'text'`,
        'string.empty': `"firstname" cannot be an empty field`,
        'any.required': `"firstname" is a required field`
    }),
    lastname: Joi.string().required().messages({
        'string.base': `"lastname" should be a type of 'text'`,
        'string.empty': `"lastname" cannot be an empty field`,
        'any.required': `"lastname" is a required field`
    }),
    email: Joi.string().email().required().messages({
        'string.base': `"email" should be a type of 'text'`,
        'string.empty': `"email" cannot be an empty field`,
        'string.email': `"email" must be a valid email`,
        'any.required': `"email" is a required field`
    }),
    password: Joi.string().pattern(PASSWORD_REGEX).min(8).max(1024).required().messages({
        'string.base': `"password" should be a type of 'text'`,
        'string.empty': `"password" cannot be an empty field`,
        'string.min': `"password" should have a minimum length of 8 characters`,
        'string.max': `"password" should have a maximum length of 1024 characters`,
        'string.pattern.base': `"password" must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
        'any.required': `"password" is a required field`
    }),
    role: Joi.string().valid('user', 'admin').required().messages({
        'string.base': `"role" should be a type of 'text'`,
        'string.empty': `"role" cannot be an empty field`,
        'any.only': `"role" must be one of ['user', 'admin']`,
        'any.required': `"role" is a required field`
    })

});


const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': `"email" should be a type of 'text'`,
        'string.empty': `"email" cannot be an empty field`,
        'string.email': `"email" must be a valid email`,
        'any.required': `"email" is a required field`
    }),
    password: Joi.string().pattern(PASSWORD_REGEX).min(8).max(1024).required().messages({
        'string.base': `"password" should be a type of 'text'`,
        'string.empty': `"password" cannot be an empty field`,
        'string.min': `"password" should have a minimum length of 8 characters`,
        'string.max': `"password" should have a maximum length of 1024 characters`,
        'string.pattern.base': `"password" must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
        'any.required': `"password" is a required field`
    })
});

const userUpdateSchema = Joi.object({
    firstname: Joi.string().messages({
        'string.base': `"firstname" should be a type of 'text'`,
        'string.empty': `"firstname" cannot be an empty field`
    }).optional(),
    lastname: Joi.string().messages({
        'string.base': `"lastname" should be a type of 'text'`,
        'string.empty': `"lastname" cannot be an empty field`
    }).optional(),
    email: Joi.string().email().messages({
        'string.base': `"email" should be a type of 'text'`,
        'string.empty': `"email" cannot be an empty field`,
        'string.email': `"email" must be a valid email`
    }).optional(),
    password: Joi.string().pattern(PASSWORD_REGEX).min(6).max(6).messages({
        'string.base': `"password" should be a type of 'text'`,
        'string.empty': `"password" cannot be an empty field`,
        'string.min': `"password" should have a minimum length of 6 characters`,
        'string.max': `"password" should have a maximum length of 6 characters`,
        'string.pattern.base': `"password" must contain at least one uppercase letter, one lowercase letter, one number, and one special character`
    }).optional(),  
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': `"email" should be a type of 'text'`,
        'string.empty': `"email" cannot be an empty field`,
        'string.email': `"email" must be a valid email`,
        'any.required': `"email" is a required field`
    })
});

const resetPasswordSchema = Joi.object({
    password: Joi.string().pattern(PASSWORD_REGEX).min(8).max(1024).required().messages({
        'string.base': `"password" should be a type of 'text'`,
        'string.empty': `"password" cannot be an empty field`,
        'string.min': `"password" should have a minimum length of 8 characters`,
        'string.max': `"password" should have a maximum length of 1024 characters`,
        'string.pattern.base': `"password" must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
        'any.required': `"password" is a required field`
    }),
    confirmPassword: Joi.string().pattern(PASSWORD_REGEX).min(8).max(1024).required().messages({
        'string.base': `"password" should be a type of 'text'`,
        'string.empty': `"password" cannot be an empty field`,
        'string.min': `"password" should have a minimum length of 8 characters`,
        'string.max': `"password" should have a maximum length of 1024 characters`,
        'string.pattern.base': `"password" must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
        'any.required': `"password" is a required field`
    })
});


const idSchema = Joi.object({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.pattern.base': 'Invalid ID format. ID must be a 24-character hex string.',
        'any.required': 'ID is required.'
    })
});

module.exports = { userRegSchema, loginSchema, userUpdateSchema, idSchema, forgotPasswordSchema, resetPasswordSchema };
