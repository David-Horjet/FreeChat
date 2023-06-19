const express = require('express');

// creating the userRouter
const mainRouter = express.Router();

// importing the controller
const mainController = require('../controllers/mainController');

// home
mainRouter.get('/', mainController.home);

// 404
mainRouter.get('*', mainController.lost);



// exporting the user router
module.exports = {
     mainRouter
};