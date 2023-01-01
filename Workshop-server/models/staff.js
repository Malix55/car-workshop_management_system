const mongoose = require('mongoose');
require('mongoose-double')(mongoose);


var SchemaTypes = mongoose.Schema.Types;
const staffSchema = new mongoose.Schema({
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
    timeoffLeaves: {
        default: 2,
        type: Number
    },
    timeoffDescription: {
        type: String,
        default: "i am off for 2 daya A THEE IA  function goin on town which i have to attend and ill leave the city todaya and im busy too"
    },
    timeoffCompleted: {
        type: Number,
        default:20
    },
    online: {
        type: Boolean,
        default: true
    },
    designation: {
        type: String
    },
    checkedIn: {
        type: String,
        default: 'Not Checked in'
    },
    task: [{
        name: {
            type:String
        },
        status: {
            type:String
        },
        dueDate: {
            type:Date
        },
    }],
});

module.exports = mongoose.model('staff', staffSchema);