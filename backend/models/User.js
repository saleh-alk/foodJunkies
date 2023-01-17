const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    hashedPassword: {
        type: String,
        required: true
    }

},
    {
        timestamps: true
    })

module.exports = User = mongoose.model('User', userSchema)
