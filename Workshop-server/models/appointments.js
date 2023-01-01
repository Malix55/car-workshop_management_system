const mongoose = require('mongoose');

const appointmentsSchema = new mongoose.Schema({
    date: {
        type: String
    },
    time: {
        type: String,
    },
    cid: {
        type: String,
        ref: 'client'
    },
    cat: {
        type: String
    },
    disc: {
        type: String
    },
    status: {
        type: String,
    },
});

module.exports = mongoose.model('Appointments', appointmentsSchema);