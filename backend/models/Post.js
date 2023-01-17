const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
},
body: {
    type: String,
    required: true
},
likes: [{
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}],
comments : [
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        text: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
]
},{
    timestamps: true
})

module.exports = Post = mongoose.model('Post', postSchema)
