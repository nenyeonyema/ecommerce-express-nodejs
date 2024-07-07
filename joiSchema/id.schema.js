const Joi = require('joi');

const idSchema = Joi.object({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.pattern.base': 'Invalid ID format. ID must be a 24-character hex string.',
        'any.required': 'ID is required.'
    })
});

module.exports = idSchema;