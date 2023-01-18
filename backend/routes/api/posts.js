const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// const User = mongoose.model('User');
// const Post = mongoose.model('Post');
const Post = require('../../models/Post')
const User = require('../../models/User')
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

router.patch('/id', requireUser, async(req, res, next)=>{
  try{
    const posts = await Post.findById(req.params.id)
      if (posts.post.id.toString() !== req.user.id.toString()) {
          res.status().json({ notowned: 'Current user does not own this posts' })
  } else {
      posts.body = req.body.body;
      let newPost = await posts.save();
      return res.json(newPost);
  }}
  catch(err){
    const error = new Error('Post not found');
    error.statusCode = 404;
    error.errors = {message: "Something went wrong saving"};
  }
})

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
    const imageUrls = await multipleFilesUpload({ files: req.files, public: true });
    try {
      const newPost = new Post({
        body: req.body.body,
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


router.delete('/:id', requireUser, async (req, res)=>{
  try {
    const post = await Post.findById(req.params.id);
    if (post.author._id.toString() !== req.user._id.toString()){
     
      return res.status(401).json({msg: 'User not authorized'});
    }

    await post.remove();

    res.json({msg: 'Post removed' });
  }catch(err){
    console.error(err.message)
    res.status(500).send('Server Error');
  };
})



module.exports = router;
