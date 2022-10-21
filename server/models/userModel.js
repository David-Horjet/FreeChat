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
          default: "public/uploads/person-icon-svg-1.jpg",
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