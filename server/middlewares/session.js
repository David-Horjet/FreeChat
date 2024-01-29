const session = require('express-session');


const newSession = session({
     secret: 'superSecret',
     resave: true,
     saveUninitialized: true,
     cookies: {
          maxAge: 60000
     },
});

module.exports = {
     newSession,
};