const express = require('express');
const bcrypt = require('bcryptjs')
const mongoose = require("mongoose")
const User = mongoose.model('User')
const passport = require("passport")
const { loginUser, restoreUser } = require("../../config/passport")
const { isProduction } = require("../../config/keys")
const { singleFileUpload, singleMulterUpload } = require("../../awsS3");

const validateRegisterInput = require("../../validations/register")
const validateLoginInput = require("../../validations/login")

const router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.json({
    message: "GET /api/users",
    profileImageUrl: req.user.profileImageUrl
  })
});


router.post('/register', singleMulterUpload("image"), validateRegisterInput, async (req, res, next) => {
  // Check to make sure no one has already registered with the proposed email or
  // username.
  const user = await User.findOne({
    $or: [{ email: req.body.email }, { username: req.body.username }]
  });

  if (user) {
    // Throw a 400 error if the email address and/or email already exists
    const err = new Error("Validation Error");
    err.statusCode = 400;
    const errors = {};
    if (user.email === req.body.email) {
      errors.email = "A user has already registered with this email";
    }
    if (user.username === req.body.username) {
      errors.username = "A user has already registered with this username";
    }
    err.errors = errors;
    return next(err);
  }

  // Otherwise create a new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email
  });

  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(req.body.password, salt, async (err, hashedPassword) => {
      if (err) throw err;
      try {
        newUser.hashedPassword = hashedPassword;
        const user = await newUser.save();
        return res.json(await loginUser(user));
      }
      catch (err) {
        next(err);
      }
    })
  });
});

router.post('/login', validateLoginInput, async (req, res, next) => {
  passport.authenticate("local", async function (err, user) {
    if (err) return next(err)
    if (!user) {
      const err = new Error("Invalid credentials");
      err.statusCode = 400;
      err.errors = { email: "Invalid credentials" }
      return next(err)

    }
    return res.json(await loginUser(user))

  })(req, res, next)
})

router.get('/current', restoreUser, (req, res) => {
  if (!isProduction) {

    const csrfToken = req.csrfToken()
    res.cookie("CSRF-Token", csrfToken)
  }
  if (!req.user) return res.json(null)
  res.json({
    _id: req.user._id,
    username: req.user.username,
    email: req.user.password

  })
})

module.exports = router;
