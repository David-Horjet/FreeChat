const Users = require("../models/userModel");

const allUsers = async (req, res, next) => {
     try {
          const users = await Users.find().select([
               "username",
               "email",
               "image",
               "createdAt",
               "updatedAt",
               "_id"
          ])
          return res.json(users);
     } catch (error) {
          next(error)
     }
}

const idUsers = async (req, res, next) => {
     try {
          const users = await Users.find({ _id: {$ne: req.params.id }}).select([
               "username",
               "image",
               "_id"
          ])
          return res.json(users);
     } catch (error) {
          next(error)
     }
}

const getUser = async (req, res, next) => {
     try {
          const id = req.params.id;
          const user = await Users.findById(id)
          return res.json({
               status: true,
               msg: user
          });
     } catch (error) {
          return res.json({
               status: false,
               msg: "Can't Find User"
          });
          next()
     }
}

module.exports = {
     allUsers,
     getUser,
     idUsers,
}