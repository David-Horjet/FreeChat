const cloudinary = require('cloudinary').v2;

function cloudinaryUserUploader(imagePath, callback) {
    cloudinary.uploader.upload(imagePath, { folder: 'freechat/users' }, function (error, result) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
}

function cloudinaryStatsUploader(imagePath, callback) {
    cloudinary.uploader.upload(imagePath, { folder: 'freechat/status' }, function (error, result) {
        if (error) {
            callback(error, null);
        } else {
            callback(null, result);
        }
    });
}

// function cloudinaryStatUploader(images, callback) {
//     const uploadedImagesURL = [];
//     let completedCount = 0;

//     images.forEach((image, index) => {
//         cloudinary.uploader.upload(image.path, { folder: 'freechat/stats', resource_type: 'auto' }, function (error, result) {
//             completedCount++;
//             if (error) {
//                 callback(error, null);
//                 return; // Exit the function early if there's an error
//             }
//             uploadedImagesURL[index] = result.secure_url;

//             // Check if all files have been uploaded
//             if (completedCount === images.length) {
//                 callback(null, uploadedImagesURL);
//             }
//         });
//     });
// }


module.exports = { cloudinaryStatsUploader, cloudinaryUserUploader };