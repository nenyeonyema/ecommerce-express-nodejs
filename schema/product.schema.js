const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    description: {
        type: String,
        required: [true, 'description is required']
    },
    price: {
        type: Number,
        // default: null
        required: [true, 'price is required']
    },
    quantity: {
        type: Number,
        // default: null
        required: [true, 'quantity purchased is required']
    },
    isPurchased: {
        type: Boolean,
        // default: 0
        required: [true, 'purchased made is required']

    },
    categoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'categories'
        // required: [true, 'purchased made is required']
    },
    imgUrl: {
        type: String,
        required: [true, 'purchased made is required']
    }
    
});

const productmodel = mongoose.model('product', productSchema);
module.exports = productmodel;



// const { type } = require('express/lib/response');
// refrence is the model or category name
// the type is the document or object or user id