const mongoose = require('mongoose');

const Post = new mongoose.Schema({
    title: String,
    content: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: "The post must have a user", 
    }
})

module.exports = mongoose.model('Post', Post);