const Joi = require('joi');

// For validating url id parameter
const idSchema = Joi.object({
    id: Joi.string().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.pattern.base': 'Invalid ID format. ID must be a 24-character hex string.',
        'any.required': 'ID is required.'
    })
});

// This schema validates the form for update
// const productSchema = Joi.object({
//     name: Joi.string().optional(),
//     description: Joi.string().optional(),
//     price: Joi.number().optional(),
//     quantity: Joi.number().integer().optional(),
//     isPurchased: Joi.boolean().optional(),
//     categoryId: Joi.string().optional(),
//     imgUrl: Joi.string().uri().optional()
// });


// This validates forms data using joi by accepting the fields
const updateValidator = (fields) => { 
    const schema = Joi.object({
        name: Joi.string().optional(),
        description: Joi.string().optional(),
        price: Joi.number().optional(),
        quantity: Joi.number().integer().optional(),
        isPurchased: Joi.boolean().optional(),
        categoryId: Joi.string().optional(),
        imgUrl: Joi.string().uri().optional()
    });
    return schema.validate(fields);
}


module.exports = { idSchema, updateValidator };