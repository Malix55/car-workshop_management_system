const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    brand: {
        type: String,
    },
    retailprice: {
        type: Number,
    },
    saleprice: {
        type: Number,
    },
    quantity: {
        type: Number,
    },
    part_ID: {
        type: String,
    },
    make: {
        type: String,
    },
    model: {
        type: String,
    },
    weight: {
        type: Number,
    },
    modelYear: {
        type: String,
    },
    quality: {
        type: String,
    },
    description: {
        type: String,
    },
    creator: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    },
    image: {
        type: String,
    },
    discount: {
        type:String
    }
});

module.exports = mongoose.model('products', productSchema);
