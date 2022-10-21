const userRouter = require("express").Router();

const userController = require("../controllers/userController");
const { loginRequired } = require("../middlewares/auth");

userRouter.get('/users', userController.allUsers);
userRouter.get('/all/:id', userController.idUsers);
userRouter.post('/users/:id', loginRequired);
userRouter.get('/:username', userController.getUser);
userRouter.put('/settings/:id', userController.updateUser);

module.exports = {
     userRouter
}