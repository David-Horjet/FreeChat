const adminRouter = require("express").Router();

const adminController = require("../controllers/adminController");
const { loginRequired } = require("../middlewares/auth");

adminRouter.get('/all', adminController.allUsers);

module.exports = {
     adminRouter
}