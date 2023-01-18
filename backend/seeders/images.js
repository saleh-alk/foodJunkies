const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Tweet = require('../models/Tweet');

const DEFAULT_PROFILE_IMAGE_URL = 'https://nestors-demo-seed.s3.us-west-1.amazonaws.com/blank_pfp.png'; // <- Insert the S3 URL that you copied above here

// Connect to database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB successfully');
    initializeImages();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

const initializeImages = async () => {
  console.log("Initializing profile avatars...");
  await User.updateMany({}, { profileImageUrl: DEFAULT_PROFILE_IMAGE_URL });

  console.log("Initializing Tweet image URLs...");
  await Tweet.updateMany({}, { imageUrls: [] });

  console.log("Done!");
  mongoose.disconnect();
}
