const  { Schema, model } = require('mongoose');		

const UserSchema = Schema({
    SubscriberID: {
        type: String,
        required: true,
        unique: true
    },
    Status: {
        type: String,
        required: true,
    },
    UsageBytes: {
        type: String,
    },
    _id: {
        type: String
    }
});

module.exports = model( 'User', UserSchema );