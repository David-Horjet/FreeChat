const home = (req, res) => {
     res.json({
          status: true,
          message: "PingFly's Api is fully functional 😜😎",
     });
}

const lost = (req, res) => {
     res.json({
          status: false,
          message: "Sorry, You've completely lost your way 😢",
     });
}

module.exports = {
     home,
     lost
}