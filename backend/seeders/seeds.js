const mongoose = require("mongoose");
const { mongoURI: db } = require('../config/keys.js');
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcryptjs');
const { faker } = require('@faker-js/faker');

const DEFAULT_PROFILE_IMAGE_URL = "https://nestors-demo-seed.s3.us-west-1.amazonaws.com/bridge.jpeg"

const NUM_SEED_USERS = 10;
const NUM_SEED_POSTS = 30;

// Create users
const users = [];

users.push(
  new User ({
    username: 'demo-user',
    email: 'demo-user@appacademy.io',
    hashedPassword: bcrypt.hashSync('starwars', 10),
    profileImageUrl: DEFAULT_PROFILE_IMAGE_URL
  })
)

<<<<<<< HEAD:backend/seeders/seeds.js
// for (let i = 1; i < NUM_SEED_USERS; i++) {
//   const firstName = faker.name.firstName();
//   const lastName = faker.name.lastName();
//   users.push(
//     new User ({
//       username: faker.internet.userName(firstName, lastName),
//       email: faker.internet.email(firstName, lastName),
//       hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),
=======
for (let i = 1; i < NUM_SEED_USERS; i++) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  users.push(
    new User ({
      username: faker.internet.userName(firstName, lastName),
      email: faker.internet.email(firstName, lastName),
      hashedPassword: bcrypt.hashSync(faker.internet.password(), 10),

>>>>>>> main:backend/seeders/seed.js


//     })
//   )
// }

// Create posts

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    insertSeeds();
  })
  .catch(err => {
    console.error(err.stack);
    process.exit(1);
  });

  const insertSeeds = () => {

    User.collection.drop()
                   .then(() => Post.collection.drop())
                   .then(() => User.insertMany(users))
                  //  .then(() => Post.insertMany(posts))
                   .then(() => {
                     mongoose.disconnect();
                   })
                   .catch(err => {
                     console.error(err.stack);
                     process.exit(1);
                   });
  }
