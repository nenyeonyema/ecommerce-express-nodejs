const mongoose = require('mongoose');
// const { type } = require('express/lib/response');

const catSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'name is required'],
    },
    description: {
        type: String,
        required: [true, 'description is required']
    }
});

const catmodel = mongoose.model('categories', catSchema);

module.exports = catmodel;