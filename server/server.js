const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const socket = require("socket.io");
require("dotenv").config();


const {
     authRouter
} = require("./routes/authRoute");
const {
     userRouter
} = require("./routes/userRoute");
const {
     adminRouter
} = require("./routes/adminRoute");
const {
     messageRouter
} = require("./routes/messagesRoute");
const {
     mainRouter
} = require('./routes/mainRoutes');
const {
     newSession
} = require("./middlewares/session");

PORT = process.env.PORT;
dbURI = process.env.dbURI;
const corsOptions = {
     origin: 'https://freechatt.netlify.app',
     credentials: true,
     optionSuccessStatus: 200
}

const app = express();

app.use(newSession);
app.use(express.json());
app.use(cors(corsOptions));
app.use("/public/", express.static('./public'));
app.use((req, res, next) => {
     res.locals.user = req.session.user;
     next();
})



app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/messages", messageRouter);
app.use('/', mainRouter);

mongoose
     .connect(dbURI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
     })
     .then((result) => {
          console.log(`FreeChat's Database connected`);
     })
     .catch((error) => console.log(error));

const server = app.listen(PORT, (req, res) => {
     console.log(`FreeChat's Server is running at http://localhost:${PORT}`);
})

const io = socket(server, {
     handlePreflightRequest: (req, res) => {
         const headers = {
             "Access-Control-Allow-Headers": "Content-Type, Authorization",
             "Access-Control-Allow-Origin": req.headers.origin, 
             "Access-Control-Allow-Credentials": true
         };
         res.writeHead(200, headers);
         res.end();
     }
 });

global.onlineUsers = new Map();

io.on("connection", (socket) => {
     global.chatSocket = socket;
     socket.on("add-user", (userId) => {
          onlineUsers.set(userId, socket.id);
     });

     socket.on("send-msg", (data) => {
          const sendUserSocket = onlineUsers.get(data.to);
          if (sendUserSocket) {
               socket.to(sendUserSocket).emit("msg-receive", data.message);
          }
     })
})