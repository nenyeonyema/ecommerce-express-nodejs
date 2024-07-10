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
        validate: {
          validator: function (value) {
            return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value);
          },
          message: 'please enter a valid email',
        }
    },
    password: {
        type: String,
        required: [true, 'password is required']
    }
}, { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
