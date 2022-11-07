const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

// GET ALL USERS EXCEPT ONE

const idUsers = async (req, res, next) => {
     try {
          const users = await Users.find({
               _id: {
                    $ne: req.params.id
               }
          }).select([
               "username",
               "image",
               "about",
               "_id"
          ])
          return res.json(users);
     } catch (error) {
          next(error)
     }
}

// GET SINGLE USER

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
     const user = req.body.user
     const casedEmail = email.toLowerCase();

     const emailCheck = await Users.findOne({
          email: casedEmail
     });

     const unameCheck = await Users.findOne({
          username: username
     });

     console.log(unameCheck?.username, username, user.username)

     if (emailCheck?.email !== user.email && emailCheck?.email) {
          return res.json({
               status: false,
               message: "Email has been used by another comrade"
          })
     }

     if (unameCheck?.username !== user.username && unameCheck?.username) {
          return res.json({
               status: false,
               message: "Username has been used by another comrade"
          })
     }
     try {
          const updatedUser = await Users.findByIdAndUpdate(req.params.id, {
               $set: req.body
          });
          return res.json({
               status: true,
               message: "Profile has been successfully updated",
               user: updatedUser
          })
     } catch (error) {
          res.json({
               status: false,
               message: "An error occured while setting your profile"
          });
     }
};

// UPDATE USER PASSWORD
const updatePassword = async (req, res) => {
     const {
          password,
          currentPassword
     } = req.body

     const user = await Users.findById(req.params.id);

     const valid = await bcrypt.compare(currentPassword, user.password);

     if (!valid) {
          return res.json({
               status: false,
               message: "Password incorrect",
          })
     }

     const salt = await bcrypt.genSalt(10);
     user.password = await bcrypt.hash(password, salt);
     await user.save();

     return res.json({
          status: true,
          message: "Password updated succesfully",
     })
};

// DELETE USER
const deleteUser = async (req, res) => {

     if (req.params.id) {
          try {
               await Users.findByIdAndDelete(req.params.id)
               res.json({
                    status: true,
                    message: "User Deleted Successful"
               })
          } catch (error) {
               res.json({
                    status: false,
                    message: "There was a problem deleting user"
               })
          }
     } else {
          res.json({
               status: false,
               error: "User to be deleted not found"
          })
     }

}

module.exports = {
     getUser,
     idUsers,
     updateUser,
     updatePassword,
     deleteUser
}