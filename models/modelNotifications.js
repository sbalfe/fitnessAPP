const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema= new Schema({
    _id: String,
    message: String,
    user: {
        Type: String,
        ref: 'User'
    },
    date: Date
})

module.exports = mongoose.model('Notification', notificationSchema);