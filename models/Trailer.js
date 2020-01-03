const mongoose = require('mongoose');

const TrailerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },

    model: String,
    image: {
        data: Buffer,
        contentType: String
    },

    color: {
        type: String,
        required: true
    },

    dimension: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    capacity: Number,
    condition: String,
    year: String,
    quantity: Number
});

//comment test for github push
//test2

module.exports = mongoose.model('Trailers', TrailerSchema);