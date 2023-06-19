const jwt = require("jsonwebtoken");

loginRequired = async (req, res, next) => {
     console.log(req.headers);
     const authHeader = req.headers['authorization']
     console.log(authHeader);
     const token = authHeader && authHeader.split('')[1]

     if (!token)
          return res.json({
               status: false,
               message: "You have to Sign in"
          })

     jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
          if (err)
               return res.json({
                    status: false,
                    message: 'Session expired'
               });

          req.user = user
          return next();
     })
}


logoutRequired = (req, res, next) => {
     if (req.session && req.session.user) {
          return res.json({
               status: false,
               message: "You have to Log out"
          })
     }
     // if not user in session
     return next();
}

module.exports = {
     loginRequired,
     logoutRequired
}