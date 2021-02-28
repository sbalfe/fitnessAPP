const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hourSchema= new Schema({
    _id: String,
    user: {
        type: String,
        ref: 'User'
    },
    stepRanking: Number,
    sleepRanking: Number,
    waterRanking: Number,
})

module.exports = mongoose.model('HourSlice', hourSchema);

