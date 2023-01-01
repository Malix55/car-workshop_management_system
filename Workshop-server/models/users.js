const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    image: {
        type: String,
    },
    activated: {
        type: Boolean,
        default: false
    },
    temporaryToken: {
        type: String,
    },
    role: {
        type: String,
    },
    products: [{
        type: mongoose.Types.ObjectId,
        ref: 'products'
    }],
    staff: [{
        type: mongoose.Types.ObjectId,
        ref: 'staff'
    }],
    client: [{
        type: mongoose.Types.ObjectId,
        ref: 'client'
    }],
    gender: {
        type: String,
    },
    phoneNumber: {
        type: Number
    },
    country: {
        type: String
    },
    street: {
        type: String
    },
    society: {
        type: String
    },
    houseNumber: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: String
    },
    workshopName: {
        type: String
    },
    type: {
        type: String
    },
    open: {
        type: String
    },
    close: {
        type: String
    },
    city: {
        type: String
    },
    area: {
        type: String
    },
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('users', userSchema);

