const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: String,
    accountName: String,
    accountEmail: String,
    profilePicture: String,
    refreshToken: String,
    username: String,
    ranking: {
        stepRanking: Number,
        sleepRanking: Number,
        waterRanking: Number,
    },
    hourSlice: [{
        name: String,
        sleepValue: Number,
        stepsValue: Number,
        mood: {
            type: Number,
            enum: [1, 2, 3, 4,5,6]
        },
        averageBPM: Number,
        date: Date,
        hour: Number,
    }],
    statistics: {
        sleep: [{
            date: Number,
            sleep: Date,
            wake: Date,
            quality: Number,
        }],
        hydration: [{
            volume: Number,
            date: Date,

        }],
        steps: [{
            count: Number,
            date: Date,
        }],
        heartRate: [{
            averageBPM : Number,
            restingBPM: Number,
            high: Number,
            low: Number,
            date: Date,
        }],
    },
    settings: {
        fitnessLevel: {
            type: String,
            enum : ['low', 'moderate', 'high']
        },
        privacy: Boolean,
        notifications:{
            type: String,
            enum: ['email', 'pushNotification','phoneNumber']
        }
    },
    modelNotifications: [{
        message: String,
        date: Date,
    }],

})

module.exports = mongoose.model('User', userSchema);


