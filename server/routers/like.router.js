const express = require("express");

// Middlewares
const upload = require("../middlewares/multer.js");

// controllers
const { toggleLike } = require("../controllers/like.controller.js");

// Services
const verifyToken = require("../middlewares/auth.js");

const likeRouter = express.Router();

likeRouter.post('/:postId', verifyToken, toggleLike);

module.exports = likeRouter;