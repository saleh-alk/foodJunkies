const mongoose = require("mongoose")
const { mongoURI: db } = require("../config/keys.js")
const User = require("../models/User")

const bcrypt = require("bcryptjs")
const { faker } = require("@faker-js/faker")

const users = []
users.push(
    new User({
        username: "demo-user",
        email: 'demo-user@appacademy.io',
        hashedPassword: bcrypt.hashSync('starwars', 10)
    })
)

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB successfully');
        insertSeeds();
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });

const insertSeeds = () => {
    console.log("Resetting db and seeding users and tweets...")
    User.collection.drop()
        .then(() => User.insertMany(users))
        .then(() => {
            console.log("done!")
            mongoose.disconnect();
        })
        .catch(err => {
            console.error(err.stack)
            process.exit(1)
        })

}