const messageModel = require("../models/messageModel");

const addMessage = async (req, res, next) => {
     try {
          const {from, to, message} = req.body;
          const data = await messageModel.create({
               message: {text: message},
               users: [from, to],
               sender: from,
          });
          if (data) {
               return res.json({
                    status: true,
                    msg: "Message added Successfully"
               });
          } else {
               return res.json({
                    status: false,
                    msg: "Failed to add message to the database"
               });
          }
     } catch (error) {
          next(error);
          return res.json({
               status: false,
               msg: "Internal Server Error"
          })
     }
};

const getAllMessages = async (req, res, next) => {
     try {
          const {from, to} = req.body;
          const messages = await messageModel.find({
               users: {
                    $all: [from, to],
               },
          })
          .sort({
               updatedAt: 1
          });
          const projectMessages = messages.map((msg) => {
               return {
                    fromSelf: msg.sender.toString() === from,
                    message: msg.message.text,
                    time: msg.createdAt
               }
          });
          res.json(projectMessages);
     } catch (ex) {
          next(ex);
          res.json({
               status: false,
               msg: "Internal Server Error"
          })
     }
};

module.exports = {
     addMessage,
     getAllMessages
}