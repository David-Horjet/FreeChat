const userRouter = require("express").Router();

const userController = require("../controllers/userController");
const { loginRequired } = require("../middlewares/auth");

userRouter.get('/all/:id', userController.idUsers);
userRouter.post('/users/:id', loginRequired);
userRouter.get('/:username', userController.getUser);
userRouter.put('/settings/:id', userController.updateUser);
userRouter.put('/settings/password/:id', userController.updatePassword);
userRouter.delete('/delete/:id', userController.deleteUser);

module.exports = {
     userRouter
}