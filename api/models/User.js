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
    ],
    password: String,
    salt: String,
})

User.methods.addPost = function(post) {
    this.posts.push(post);
    return this.save();
}

module.exports = mongoose.model('User', User);