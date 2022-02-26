const mongoose = require('mongoose');


const User = new mongoose.Schema({
    name: {
        type: String,
        required: 'The name is required'
    },
    email: {
        type: String,
        required: 'The email is required'
    },
    direction: String,
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Post'
        }
    ]
})

module.exports = mongoose.model('User', User);