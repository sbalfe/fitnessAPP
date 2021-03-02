const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const waterSchema= new Schema({
    _id: String,
    user: {
        type: String,
        ref: 'User'
    },
    volume: Number,
    date: Date,
})

module.exports = mongoose.model('HourSlice', waterSchema);

