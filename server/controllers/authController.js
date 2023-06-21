const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const { generateAccessToken } = require("../utils/auth");
const { cloudinaryUserUploader } = require("../middlewares/cloudinary")

const register = async (req, res, next) => {
     try {

          const {
               username,
               email,
               password,
          } = req.body;

          const salt = await bcrypt.genSalt(10);
          const hashedPassword = await bcrypt.hash(password, salt);
          const casedEmail = email.toLowerCase();

          const emailCheck = await Users.findOne({
               email: casedEmail
          });

          const unameCheck = await Users.findOne({
               username
          });

          if (emailCheck) {
               return res.status(400).json({
                    status: false,
                    message: "Email has been used by another person"
               })
          }

          if (unameCheck) {
               return res.status(400).json({
                    status: false,
                    message: "Username has been used by another person"
               })
          }

          const user = await Users.create({
               username,
               email: casedEmail,
               password: hashedPassword,
          });
          delete user.password;

          const token = generateAccessToken({ username: req.body.username });

          return res.status(201).json({
               status: true,
               message: "New User Created",
               user,
               token
          });
     } catch (error) {
          next(error);
          return res.status(500).json({
               status: false,
               message: "Internal Server Error Occured"
          })
     }
}

const login = async (req, res, next) => {
     try {
          const {
               username,
               password
          } = req.body;

          var user = await Users.findOne({
               username
          });

          if (!user) {
               return res.status(400).json({
                    status: false,
                    message: "Username not Found"
               })
          }

          const valid = await bcrypt.compare(password, user.password);

          if (!valid) {
               return res.status(400).json({
                    status: false,
                    message: "Incorrect Password"
               })
          }
          delete user.password;

          const token = generateAccessToken({ username: req.body.username });

          return res.status(200).json({
               status: true,
               message: "Login Successful",
               user: user,
               token: token
          })

     } catch (error) {
          next(error);
          return res.status(500).json({
               status: false,
               message: "Internal Server Error Occured"
          })
     }
}

const setImage = async (req, res, next) => {
     const { about } = req.body;
     const imageFile = req.file
     console.log(req.body)
     console.log(imageFile)
     if (!imageFile || !about) {
          res.status(400).json({
               status: false,
               msg: "All fields are required"
          })
     } else {
          try {
               cloudinaryUserUploader(imageFile?.path, async (error, result) => {
                    if (error) {
                         console.error(error);
                         return res.status(400).json({
                              status: false,
                              msg: "You've got some errors",
                              error: error.message
                         });
                    } else {
                         const userId = req.user._id;
                         console.log(userId);
                         const image = result.secure_url;
                         const userData = await Users.findByIdAndUpdate(userId, {
                              new: true,
                              image,
                              about
                         });
                         return res.json({
                              status: true,
                              msg: "Profile Image Successfully Set",
                              user: userData
                         });
                    }

               })
          } catch (error) {
               next(error);
               console.log(error)
               return res.status(500).json({
                    status: false,
                    message: "Internal Server Error Occured"
               })
          }
     }
}

module.exports = {
     register,
     login,
     setImage
}