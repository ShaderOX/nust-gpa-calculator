const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    email: {
        type: String,
        min: 6,
        max: 256,
        unique: true,
        required: true
    },
    password: {
        type: String,
        min: 6,
        max: 128,
        required: true
    },
    course: {
        type: String,
        min: 2,
        max: 64,
        required: true
    }
});

module.exports = mongoose.model('User', schema);