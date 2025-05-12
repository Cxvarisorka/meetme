const { default: mongoose } = require("mongoose");
const Post = require("../models/post.model.js");
const imageUpload = require("../utils/imageUpload.js");
const deleteImage = require("../utils/imageDelete.js");

// const url = "https://res.cloudinary.com/djncf3ewg/image/upload/v1745799066/posts/174579393825424b144f5-fee9-4f84-b45a-7232437fb97d";


// // Extract the public ID (including the 'posts/' part)
// const publicId = url.split('/').slice(7).join('/').split('.')[0];  // Getting everything after the 'upload' part

// console.log(publicId);  // Output: posts/1745799054248Screenshot_2024-02-27_152302

// // Deleting the image using the public ID
// cloudinary.uploader.destroy(publicId, (error, result) => {
//     if (error) {
//         console.error("Error deleting image:", error);
//     } else {
//         console.log("Image deleted successfully:", result);
//     }
// });


const addPost = async (req, res) => {
    try {
        const { title, description, userId } = req.body;

        const result = await imageUpload("posts", req.file.path);

        const newPost = await Post.create({
            title,
            description,
            userId,
            postImgUrl: result.secure_url
        });

        res.status(201).json(newPost);

    } catch(err) {
        console.error('Post Add Error:', err.message);
        res.status(500).json({ message: err.message });
    }
}

const editPost = async (req, res) => {
    try {
        
        const { title, description } = req.body;
        const { postId } = req.params;

        const post = await Post.findById(postId);
        
        if (!post) {
            return res.status(404).json({ message: "Post not found to edit" });
        }

        // SECURITY CHECK
        
        if (post.userId.toString() !== req.user.userId.toString()) {
            return res.status(403).json({ message: "You are not allowed to edit this post" });
        }


        let updatedFields = { title, description };

        if (req.file) {
            const result = await imageUpload("posts", req.file.path);
            await deleteImage(post.postImgUrl); // delete old image
            updatedFields.postImgUrl = result.secure_url;
        }

        const updatedPost = await Post.findByIdAndUpdate(
            postId,
            { $set: updatedFields },
            { new: true } // return the updated document
        );

        res.status(200).json(updatedPost);

    } catch (err) {
        console.error('Post Edit Error:', err.message);
        res.status(500).json({ message: err.message });
    }
};

const deletePost = async (req, res) => {
    try {
        const { postId } = req.params;  // Extract postId from the request parameters

        // Find the post and delete it
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Delete the image from Cloudinary if it exists
        if (post.postImgUrl) {
            deleteImage(post.postImgUrl);
        }
        

        // Delete the post from the database
        await Post.findByIdAndDelete(postId);

        res.status(200).json({ message: 'Post and image deleted successfully', postId });

    } catch (err) {
        console.error('Post Delete Error:', err.message);
        res.status(500).json({ message: err.message });
    }
};

const getPost = async (req, res) => {
    try {
        const { postId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: "Invalid Post ID" });
        }

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json(post);

    } catch (err) {
        console.error('Error getting post:', err.message);
        res.status(500).json({ message: err.message });
    }
};

const getAllPosts = async (req, res) => {
    const limit = parseInt(req.query.limit) || 10;
    // const offset = parseInt(req.query.offset) || 0;
  
    try {
      const posts = await Post.find()
        .sort({ createdAt: -1 })
        .limit(limit)
        .populate('userId', 'username email profileImgUrl'); // populate specific fields
  
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
};
  
  

const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;

        // ვამოწმებთ რომ userId იყოს არის ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid User ID" });
        }
        
        const posts = await Post.find({ userId });

        if (posts.length === 0) return res.json([]);

        res.status(200).json(posts); 
    } catch (err) {
        console.error('Posts Get Error:', err.message);
        res.status(500).json({ message: err.message });
    }
}



module.exports = {addPost, getPost, getUserPosts, deletePost, editPost, getAllPosts};