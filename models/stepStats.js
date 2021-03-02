const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stepSchema= new Schema({
    _id: String,
    user: {
        type: String,
        ref: 'User'
    },
    count: Number,
    date: Date,
})

module.exports = mongoose.model('StepStats', stepSchema);

