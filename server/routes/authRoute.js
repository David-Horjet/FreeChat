const authRouter = require("express").Router();

const authController = require("../controllers/authController");
const { loginRequired } = require("../middlewares/auth");
const upload = require("../middlewares/upload");

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.post('/setImage', loginRequired, upload.single("image"), authController.setImage);

module.exports = {
     authRouter
}