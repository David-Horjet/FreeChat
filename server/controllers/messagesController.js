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
               return res.status(201).json({
                    status: true,
                    msg: "Message added Successfully"
               });
          } else {
               return res.status(400).json({
                    status: false,
                    msg: "Failed to add message to the database"
               });
          }
     } catch (error) {
          next(error);
          return res.status(500).json({
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
          res.status(200).json({
               status: true,
               projectMessages
          });
     } catch (ex) {
          next(ex);
          res.status(500).json({
               status: false,
               msg: "Internal Server Error"
          })
     }
};

module.exports = {
     addMessage,
     getAllMessages
}