const Posts = require("../models/postModel");
const Users = require("../models/userModel");

const allPosts = async (req, res, next) => {
     try {
          const posts = await Posts.find().sort({
               createdAt: -1
          })
          return res.json({
               status: true,
               msg: "Post fetch Successful",
               posts
          });
     } catch (error) {
          next(error);
          return res.json({
               status: false,
               msg: "Post fetch Failed"
          });
     }
}

const createPost = async (req, res, next) => {
     try {
          console.log(req.user);
          const {
               content
          } = req.body;
          const post = await Posts.create({
               content
          })
          return res.json({
               status: true,
               msg: "Post Created Successfully",
               post
          })

     } catch (error) {
          next(error);
          return res.json({
               status: true,
               msg: "Unable to Share timeline, Try again",
          })
     }
}

module.exports = {
     allPosts,
     createPost
}