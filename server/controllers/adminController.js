const Users = require("../models/userModel");

// GET ALL USERS

const allUsers = async (req, res, next) => {
     try {
          const users = await Users.find()
          return res.json(users);
     } catch (error) {
          next(error)
     }
}

module.exports = {
     allUsers,
}