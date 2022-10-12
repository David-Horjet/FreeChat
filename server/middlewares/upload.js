const multer = require('multer');

let allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'];

const upload = multer({
     storage: multer.diskStorage({
          destination: './public/uploads/',
          filename: function (req, file, cb) {
               let name = Date.now().toString() + '_' + file.originalname;
               cb(null, name);
          },
     }),
     limits: {
          fileSize: 5 * 1024 * 1024,
     },
     fileFilter: function (req, file, cb) {
          if (!allowedTypes.includes(file.mimetype)) {
               cb(new Error('Only image files are allowed'), false);
          }
          cb(null, true);
     },
});

module.exports = {
     upload
}