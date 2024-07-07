const Joi = require('joi');

const productSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required'
    }),
    description: Joi.string().trim().required().messages({
        'string.empty': 'Description is required',
        'any.required': 'Description is required'
    }),
    price: Joi.number().min(0).required().messages({
        'number.base': 'Price must be a number',
        'number.min': 'Price cannot be negative'
    }),
    quantity: Joi.number().integer().min(0).required().messages({
        'number.base': 'Quantity must be a number',
        'number.integer': 'Quantity must be an integer',
        'number.min': 'Quantity cannot be negative'
    }),
    isPurchased: Joi.boolean().required().messages({
        'number.base': 'isPurchased must be a number',
        'number.integer': 'isPurchased must be an integer',
        'number.min': 'isPurchased cannot be negative'
    }),
    categoryId: Joi.string().trim().pattern(/^[0-9a-fA-F]{24}$/).required().messages({
        'string.empty': 'Category ID is required',
        'any.required': 'Category ID is required'
    }),
    imgUrl: Joi.string().uri().messages({
        'string.uri': 'Image URL must be a valid URL'
    })
});


module.exports = productSchema;

// const Joi = require('joi');


// imageUrl:Joi.string().required()

// const updateSchema = Joi.object({
//     name:Joi.string().required(),
//     description:Joi.string().required(),
//     price:Joi.number(),
//     quantity:Joi.number(),
//     isPurchased:Joi.number(),
//     categoryId:Joi.ref('categories').required(),
//     imgUrl:Joi.string()
// });
// module.exports = productSchema;

