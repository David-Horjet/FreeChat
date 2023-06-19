const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const generatePasswordHash = (password) => {
     return bcrypt.hashSync(password, 10);
}

const validatePassword = (password, hash) => {
     return bcrypt.compareSync(password, hash);
}

const generateAccessToken = (username) => {
     return jwt.sign(username, process.env.TOKEN_SECRET, {
          expiresIn: '300s'
     });
}

module.exports = {
     generatePasswordHash,
     validatePassword,
     generateAccessToken
};