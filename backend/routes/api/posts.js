const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const User = mongoose.model('User');
// const Post = mongoose.model('Post');
const Post = require('../../models/Post')
const User = require('../../models/User')
const { requireUser } = require('../../config/passport');
const validatePostInput = require('../../validations/post');

router.get('/', async (req, res) => {
    try {
    const posts = await Post.find()
                                // .populate("author", "_id, body")
                                //.populate("author", "_id username")
                                .sort({ createdAt: -1 });
    return res.json(posts);
    }
    catch(err) {
    return res.json([]);
    }
});

router.get('/user/:userId', async (req, res, next) => {
    let user;
    try {
    user = await User.findById(req.params.userId);
    } catch(err) {
    const error = new Error('User not found');
    error.statusCode = 404;
    error.errors = { message: "No user found with that id" };
    return next(error);
}
    try {
    const posts = await Post.find({ author: user._id })
                                .sort({ createdAt: -1 })
                                .populate("author", "_id, username");
    return res.json(posts);
    }
    catch(err) {
    return res.json([]);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
    const post = await Post.findById(req.params.id)
                                .populate("author", "id, username");

    if(!post){
      return res.status(404).json({msg: "Post not found"})
    }
    return res.json(post);
    }
    catch(err) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(error);
    }
});

router.post('/', requireUser, validatePostInput, async (req, res, next) => {
    try {

      const user = await User.findById(req.user.id).select("-hashedPassword")
      const newPost = new Post({
        body: req.body.text,
        author: req.user._id
      });


      let post = await newPost.save();
      //post = await post.populate('author', '_id, username');
      return res.json(post);
    }
    catch(err) {
      next(err);
    }
  });

module.exports = router;
