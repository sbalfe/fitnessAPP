const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hourSchema= new Schema({
    _id: String,
    user: {
        type: String,
        ref: 'User'
    },
    volume: Number,
    date: Date,
})

module.exports = mongoose.model('HourSlice', hourSchema);
