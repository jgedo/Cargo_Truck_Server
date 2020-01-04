const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({

    /*firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },*/

    username: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('users', UserSchema);
module.exports = User;