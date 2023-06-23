const userRouter = require("express").Router();

const userController = require("../controllers/userController");
const { loginRequired } = require("../middlewares/auth");

userRouter.get('/all/e-user', loginRequired, userController.idUsers);
userRouter.post('/users/:id', loginRequired);
userRouter.get('/profile', loginRequired, userController.getUser);
userRouter.put('/settings', loginRequired, userController.updateUser);
userRouter.put('/settings/password/:id', userController.updatePassword);
userRouter.delete('/delete/:id', userController.deleteUser);

module.exports = {
     userRouter
}