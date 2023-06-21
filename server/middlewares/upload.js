const multer = require("multer");

// Configure Multer for file upload
const storage = multer.diskStorage({
     filename: (req, file, cb) => {
          cb(null, Date.now() + '_' + file.originalname);
     }
});

const upload = multer({ storage });

module.exports = upload