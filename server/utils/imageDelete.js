const cloudinary = require('cloudinary').v2;

const deleteImage = async (url) => {
    // const url = "https://res.cloudinary.com/djncf3ewg/image/upload/v1745799066/posts/174579393825424b144f5-fee9-4f84-b45a-7232437fb97d";

    // Extract the public ID (including the 'posts/' part)
    const publicId = url.split('/').slice(7).join('/').split('.')[0];  // Getting everything after the 'upload' part

    // console.log(publicId);  // Output: posts/1745799054248Screenshot_2024-02-27_152302

    // Deleting the image using the public ID
    await cloudinary.uploader.destroy(publicId, (error, result) => {
        if (error) {
            console.error("Error deleting image:", error);
        } else {
            console.log("Image deleted successfully:", result);
        }
    });
}

module.exports = deleteImage;