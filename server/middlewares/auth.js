const jwt = require("jsonwebtoken");

const loginRequired = (req, res, next) => {
     const bearerToken = req.headers.authorization;

     if (!bearerToken || !bearerToken.startsWith('Bearer ')) {
          // Bearer token is missing or invalid
          return res.status(401).json({
               status: false,
               message: 'You must be logged in'
          });
     }

     const token = bearerToken.split('Bearer ')[1];
     console.log(token)

     try {
          // Verify and decode the token
          const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

          console.log(decoded)

          if(!decoded) {
               return res.status(401).json({
                    status: false,
                    message: 'Please sign in again, your session has expired'
               });
          }

          // Attach the decoded user information to the request object for future use
          req.user = decoded;

          // Proceed to the next middleware or route handler
          next();
     } catch (err) {
          // Token verification failed
          return res.status(500).json({
               status: false,
               message: 'Internal server error',
               error: err
          });
     }
}


const logoutRequired = (req, res, next) => {
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