const multer = require('multer');

// const profileStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'profiles',
//         allowed_formats: ['jpeg', 'png', 'jpg'],
//         transformation: [{ width: 500, height: 500, crop: 'limit' }, {
//             quality: "auto",
//             fetch_format: "auto"
//         }],
//     },
// });

// const postStorage = new CloudinaryStorage({
//     cloudinary: cloudinary,
//     params: {
//         folder: 'posts',
//         allowed_formats: ['jpeg', 'png', 'jpg'],
//         transformation: [{
//             quality: "auto",
//             fetch_format: "auto"
//         }],
//     },
// });

// const uploadProfile = multer({ profileStorage });
// const uploadPost = multer({ postStorage });

const storage = multer.diskStorage({
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname)
    } 
})

const upload = multer({storage})

module.exports = upload;

