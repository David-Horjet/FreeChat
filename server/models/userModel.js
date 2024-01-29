const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
     username: {
          type: String,
          required: true,
     },
     email: {
          type: String,
          required: true,
     },
     password: {
          type: String,
          required: true,
     },
     image: {
          type: String,
          default: "https://res.cloudinary.com/dvwvizxtz/image/upload/v1706501880/freechat/users/gddxmaiea68jggysyu5t.jpg",
     },
     about: {
          type: String,
     },
     token: {
          type: String
     },
}, {
     timestamps: true
});

module.exports = mongoose.model('Users', userSchema)