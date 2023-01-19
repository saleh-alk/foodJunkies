const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = Schema({
author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
},
reciepeName: {
    type: String,
},
body: {
    type: String,
    required: true
},
imageUrls: {
    type: [String],
    required: false
  },
},{
    timestamps: true
})

module.exports = mongoose.model('Post', postSchema)
