const mongoose = require('mongoose');
require('mongoose-double')(mongoose);


var SchemaTypes = mongoose.Schema.Types;
const eventSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    allDay: {
        type: Boolean,
        default:true
    },
    start: {
        type: Date
    },
    end: {
        type: Date,
    },
});

module.exports = mongoose.model('event', eventSchema);