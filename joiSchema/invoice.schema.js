const Joi = require('joi');

const invoiceSchema = Joi.object({
    productName: Joi.string().trim().required(),
    quantityPurchased: Joi.number().integer().min(0).required(),
    buyerName: Joi.string().trim().required()
});

module.exports = invoiceSchema;
