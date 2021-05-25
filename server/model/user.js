const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'name is mandatory']
    },
    nick: {
        type: String,
        required: [true, 'nick is mandatory and cannot be repeated'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password is mandatory']
    },
    img:{
        type: String
    }
});












module.exports = model('User', UserSchema);