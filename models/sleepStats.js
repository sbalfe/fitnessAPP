const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const sleepSchema= new Schema({
    _id: String,
    user: {
        type: String,
        ref: 'User'
    },
    sleep: Date,
    wake: Date,
    quality: Number,
})

module.exports = mongoose.model('SleepStat', sleepSchema);

