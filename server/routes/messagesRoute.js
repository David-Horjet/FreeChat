const messageRouter = require("express").Router();

const messageController = require("../controllers/messagesController")

messageRouter.post('/addmsg', messageController.addMessage);
messageRouter.post('/getmsg', messageController.getAllMessages);

module.exports = {
     messageRouter
}