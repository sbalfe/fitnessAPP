const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const hourSchema= new Schema({
    _id: String,
    name: String,
    user: {
        type: String,
        ref : 'User'
    },
    sleepValue: Number,
    stepsValue: Number,
    mood: {
        type: String,
        enum: ['happy', 'sad', 'angry', 'anxious','depressed','energetic']
    },
    data: Date
})

module.exports = mongoose.model('HourSlice', hourSchema);


