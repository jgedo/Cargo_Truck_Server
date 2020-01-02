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

    capacity: Number,
    condition: String,
    year: String,
    quantity: Number
});

module.exports = mongoose.model('Trailers', TrailerSchema);