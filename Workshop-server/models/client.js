const mongoose = require('mongoose');
require('mongoose-double')(mongoose);


var SchemaTypes = mongoose.Schema.Types;
const clientSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String
    },
    operationalArea: {
        type: String
    },
    phoneNumber: {
        type: Number,
    },
    idNumber: {
        type: String
    },
    education: {
        type: String
    },
    country: {
        type: String
    },
    state: {
        type: String
    },
    experience: {
        type: String
    },
    skills: {
        type: String
    },
    additionalDetails: {
        type: String
    },
    phoneNumber: {
        type: Number
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    image: {
        type: String,
    },
    longitude: {
        type: SchemaTypes.Double,
        default: 73.0715 
    },
    latitude: {
        type: SchemaTypes.Double,
        default: 33.5611 
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('client', clientSchema);