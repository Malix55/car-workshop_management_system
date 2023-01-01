const mongoose = require('mongoose');
require('mongoose-double')(mongoose);


var SchemaTypes = mongoose.Schema.Types;
const ordersSchema = new mongoose.Schema({
    client_id: {
        type: mongoose.Types.ObjectId,
        ref: 'clients'
    },
    items: [{
        type: String
    }],
    bill: {
        type: String
    },
    status: {
        type: String
    },
});

module.exports = mongoose.model('orders', ordersSchema);