const mongoose = require('mongoose')

// creating user with Schema
const UserSchema =  mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    } 
})

// We will use our UserSchema with collection name "accounts" 
module.exports = mongoose.model('accounts', UserSchema)