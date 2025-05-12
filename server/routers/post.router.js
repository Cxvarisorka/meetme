const express = require("express");

// Middlewares
const upload = require("../middlewares/multer.js");

// controllers
const { addPost, getPost, getUserPosts, deletePost, editPost, getAllPosts } = require("../controllers/post.controllers.js");

// Services
const verifyToken = require("../middlewares/auth.js");


const postRouter = express.Router();

postRouter.post("/", verifyToken, upload.single("postImg"), addPost);
postRouter.put("/:postId", verifyToken, upload.single("postImg"), editPost);
postRouter.get("/all", getAllPosts);
postRouter.get("/:postId", getPost);
postRouter.get("/user/:userId", getUserPosts);
postRouter.delete("/:postId", verifyToken, deletePost)



module.exports = postRouter;