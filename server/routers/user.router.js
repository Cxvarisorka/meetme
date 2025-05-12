const express = require("express");

// Middlewares
const upload = require("../middlewares/multer.js");

// controllers
const {userRegister, userLogin, uploadProfile, tokenVerification} = require("../controllers/user.controllers.js");
const verifyToken = require("../middlewares/auth.js");

const userRouter = express.Router();

userRouter.post("/register", express.json(), userRegister);

userRouter.post("/login", express.json(), userLogin);

userRouter.post('/verify-token', verifyToken, tokenVerification);

userRouter.post("/upload-profile", verifyToken, upload.single("profile"), uploadProfile);



module.exports = userRouter;