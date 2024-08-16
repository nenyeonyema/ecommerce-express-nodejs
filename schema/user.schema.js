const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: [true, 'firstname is required']
    },
    lastname: {
        type: String,
        required: [true, 'lastname is required']
    },

    email: {
        type: String,
        required: [true, 'email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },  
    password: {
        type: String,
        required: [true, "password is required"],
        minlength: 8,
        maxlength: 1024,
    },
    role: {
        type: String,
        required: [true, 'role is required'],
        enum: ['user', 'admin'],
        default: 'user'
    }
}, { timestamps: true }
);


module.exports = mongoose.model("User", userSchema);
