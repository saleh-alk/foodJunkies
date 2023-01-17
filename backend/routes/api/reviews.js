const express = require("express");
const router = express.Router();
const Review = require('../../models/Review');
const User = require('../../models/User');
const mongoose = require("mongoose");
const passport = require('passport');
const { requireUser } = require('../../config/passport');
const validateReviewInput = require('../../validations/reviews');


function formatReview(review) {
    return {
        title: review.title,
        postedAt: review.createdAt,
        rating: review.rating,
        reviewerId: review.reviewerId._id,
        postId: review.postId,
        username: review.reviewerId.username,
        id: review.id
    }
}

function formatReviews(reviews) {
    let returnData = {};
    reviews.forEach((review) => {
        returnData[review.id] = formatReview(review);
    });
    return returnData;
}

router.get('/:userId', (req, res) => {
    User.findById(req.params.userId)
    .then(user => {
        Review.find({ userId: user.id}).populate("reviewerId")
        .then(reviews => {
            res.json(formatReviews(reviews));
        });
    }).catch(err => res.status(404).json({ nouserfound: 'No user found with that ID'}))
});



//create review
router.post('/', requireUser, validateReviewInput, async (req, res, next)=> {
    try {
        const newReview = new Review({
            reviewerId: req.user._id,
            postId: req.body.postId,
            title: req.body.title,
            body: req.body.body,
            rating: req.body.rating
        });
        let review = await newReview.save();
        return res.json(review)
    }
    catch (err) {
        const error = new Error("Something went wrong");
        error.statusCode = 404;
        error.errors = {message: "Something went wrong saving"};
        return next(error)
    }
})

router.patch('/:id', requireUser, async(req, res, next)=>{
    try{
        let review = Review.findById(req.params.id)
        if (review.reviewerId.toString() !== req.user.id.toString()) {
            res.status().json({ notowned: 'Current user does not own this review' })
    } else {
        review.body = req.body.body;
        review.rating = req.body.rating;
        let newreview = await review.save();
        return res.json(newreview);
    }}
    catch (err){
        const error = new Error("Something went wrong");
        error.statusCode = 404;
        error.errors = {message: "Something went wrong saving"};
        return res.status(400).json(errors);
}})

router.delete('/:id', requireUser, async(req, res, next)=>{
    try{            
        // const posts = await Post.findById(req.params.id);
        const reviews = await Review.findById(req.params.id);
        // const user = await User.findById(req.params.id);
        let review = reviews.delete()
        let deletedReview = await review.save()
        return res.json(deletedReview)
    }
    catch (err){
        const error = new Error("Something went wrong");
        error.statusCode = 404;
        error.errors = {message: "Something went wrong saving"};
        return res.status(400).json(errors);
}})

module.exports = router; 




