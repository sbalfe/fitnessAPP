const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSettings = new Schema({
    _id: String,
    user: {
        type: Number,
        ref: 'User'
    },
    fitnessLevel: {
        type: String,
        enum : ['averageUser', 'advancedUser']
    },
    privacy: Boolean,
    notification:{
        type: String,
        enum: ['email', 'pushNotification','phoneNumber']
    }

})

module.exports = mongoose.model('Settings', userSettings);


