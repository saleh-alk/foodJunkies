const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    // reviewerId:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User',
    //     index: true
    // },
    postId:{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        index: true
    },
    body: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

module.exports = Review = mongoose.model("Review", ReviewSchema);