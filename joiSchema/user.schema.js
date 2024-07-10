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
    password: Joi.string().pattern(PASSWORD_REGEX).required().messages({
        'string.base': `"password" should be a type of 'text'`,
        'string.empty': `"password" cannot be an empty field`,
        'string.pattern.base': `"password" must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
        'any.required': `"password" is a required field`
    })
});

// Define the Joi schema for user login
const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        'string.base': `"email" should be a type of 'text'`,
        'string.empty': `"email" cannot be an empty field`,
        'string.email': `"email" must be a valid email`,
        'any.required': `"email" is a required field`
    }),
    password: Joi.string().pattern(PASSWORD_REGEX).required().messages({
        'string.base': `"password" should be a type of 'text'`,
        'string.empty': `"password" cannot be an empty field`,
        'string.pattern.base': `"password" must contain at least one uppercase letter, one lowercase letter, one number, and one special character`,
        'any.required': `"password" is a required field`
    })
});

// Define the Joi schema for user updates
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
    password: Joi.string().pattern(PASSWORD_REGEX).messages({
        'string.base': `"password" should be a type of 'text'`,
        'string.empty': `"password" cannot be an empty field`,
        'string.pattern.base': `"password" must contain at least one uppercase letter, one lowercase letter, one number, and one special character`
    }).optional(),
    // createdAt: Joi.date().optional(),  // If you need to validate this field
    // updatedAt: Joi.date().optional()   // If you need to validate this field
});
// Function to validate user login data


// module.exports = validateUserLogin;

module.exports = { userRegSchema, loginSchema, userUpdateSchema };
