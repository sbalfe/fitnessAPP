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

hourSlice =  {
    steps: 450,
    sleepStage: 5,
    Mood: {
        type: 'Anger',
        state: 1,
    }
}


hourSlice = {
    user: {
        uid: 4985905,
        steps: 450,
    },
    user :{

    }
}