const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const expenseSchema = mongoose.Schema({
    name: {
        type: String,
    },
    quantity: {
        type: Number
    },
    cost: {
        type: Number
    },
    description: {
        type: String
    },
    expenseType: {
        type: String
    },
    cost: {
        type: Number
    }
});
expenseSchema.plugin(uniqueValidator);

module.exports = mongoose.model('expenses', expenseSchema);

