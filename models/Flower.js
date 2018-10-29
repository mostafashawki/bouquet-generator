const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

// Create Schema
const FlowerSchema = new Schema({
    species: {
        type: String,
        max:1,
        //required: true
    },
    size: {
        type: String,
        max:1,
        //required: true
        },
    stock: {
        type: Number,
        min:0,
        max:1000,
        default: 0
        },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('flower', FlowerSchema);
