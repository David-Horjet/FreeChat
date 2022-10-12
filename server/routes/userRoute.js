const userRouter = require("express").Router();

const userController = require("../controllers/userController");
const { loginRequired } = require("../middlewares/auth");

userRouter.get('/users', userController.allUsers);
userRouter.get('/users/:id', userController.idUsers);
userRouter.post('/users/:id', loginRequired);
userRouter.get('/:id', userController.getUser);

module.exports = {
     userRouter
}