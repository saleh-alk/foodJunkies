const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const { requireUser } = require('../../config/passport');
const validatePostInput = require('../../validations/post');
const { multipleFilesUpload, multipleMulterUpload } = require("../../awsS3");

router.get('/', async (req, res) => {
    try {
    const posts = await Post.find()
      // .populate("author", "_id, body")
      // .populate("author", "_id username")
      .populate("author", "_id username profileImageUrl")
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
      // .populate("author", "_id, username");
      .populate("author", "_id username profileImageUrl")
      return res.json(posts);
    }
    catch(err) {
    return res.json([]);
    }
})

router.get('/:id', async (req, res, next) => {
    try {
    const post = await Post.findById(req.params.id)
                                // .populate("author", "id, username");
      .populate("author", "_id username profileImageUrl")
      return res.json(post);
    }
    catch(err) {
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = { message: "No post found with that id" };
    return next(error);
    }
});

router.post('/', multipleMulterUpload("images"), requireUser, validatePostInput, async (req, res, next) => {
    try {
      const newPost = new Post({
        text: req.body.text,
        imageUrls,
        author: req.user._id
      });

      let post = await newPost.save();
      // post = await post.populate('author', '_id, username');
      post = await post.populate("author", "_id username profileImageUrl")
      return res.json(post);
    }
    catch(err) {
      next(err);
    }
  });


module.exports = router;
