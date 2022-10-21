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
          const users = await Users.find({
               _id: {
                    $ne: req.params.id
               }
          }).select([
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
          const username = req.params.username;
          const user = await Users.findOne({
               username: username
          })
          if (user) {
               return res.json({
                    status: true,
                    msg: `${username}'s data fetched successfully`,
                    user: user
               });
          } else {
               return res.json({
                    status: false,
                    msg: `Can't Find ${username}'s details`,
               });
          }

     } catch (error) {
          return res.json({
               status: false,
               msg: `Internal server error occured`
          });
          next()
     }
}

// UPDATE USER
const updateUser = async (req, res) => {
     const {
          username,
          email,
          about
     } = req.body;
     const casedEmail = email.toLowerCase();

     const emailCheck = await Users.findOne({
          email: casedEmail
     });

     const unameCheck = await Users.findOne({
          username
     });

     if (emailCheck) {
          return res.json({
               status: false,
               message: "Email has been used"
          })
     }

     if (unameCheck) {
          return res.json({
               status: false,
               message: "Username has been taken"
          })
     }
     try {
          const updatedUser = await Users.findByIdAndUpdate(req.params.id, {
               $set: req.body
          });
          return res.json({
               status: false,
               message: "Profile has been successfully updated",
               user: updatedUser
          })
     } catch (error) {
          res.status(500).json(error);
     }
};

module.exports = {
     allUsers,
     getUser,
     idUsers,
     updateUser
}