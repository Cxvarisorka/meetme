// const cloudinary = require("../config/cloudinary.js");
const User = require("../models/user.model.js");
const hashPassword = require("../utils/passwordHashing.js");
const fs = require("fs");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const imageUpload = require("../utils/imageUpload.js");

const userRegister = async (req, res) => {
    try {
        const {email, password, username} = req.body;

        // If user exsists on db dont give permission to register
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
        }

        // create new user
        const hashedPassword =  await hashPassword(password);
        const newUser = await User.create({
            email, 
            // profileImgUrl,
            password: hashedPassword,
            username
        });

        res.status(201).json({
            message: 'User registered successfully',
        });

    } catch(err) {
        console.error('Register Error:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        

        // Generate JWT
        const token = jwt.sign(
            { userId: user._id, email: user.email }, 
            process.env.ACCESS_TOKEN_SECRET,                 
            { expiresIn: '1d' }                      
        );
        
        res.cookie('token', token, {
            httpOnly: false, // Prevent access via JavaScript
            secure: process.env.NODE_ENV === 'production', // Use true in production, false in development
            sameSite: 'Strict',  // Ensure SameSite is configured to avoid issues with cross-site requests
            expires: new Date(Date.now() + 86400000), // 1 day expiry
        });
        

        res.json({
            email: user.email,
            username: user.username,
            profileImgUrl: user.profileImgUrl,
            role: user.role,
            id: user._id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })

    } catch(err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

const uploadProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId);
        if (!user) return res.status(404).json({ error: "There is no user with that ID" });

        // const result = await cloudinary.uploader.upload(req.file.path, {
        //     folder: "profiles",
        //     use_filename: true,
        //     unique_filename: false,
        //     overwrite: true,
        //     resource_type: "image",
        //     quality: "auto",
        //     format: "webp",
        //     transformation: [
        //         { width: 500, height: 500, crop: "fill", gravity: "center" }
        //     ]
        // });

        const result = await imageUpload("profiles", req.file.path)

        user.profileImgUrl = result.secure_url;
        await user.save(); 

        res.status(200).json({ message: "Profile uploaded successfully", profileImgUrl: result.secure_url });
    } catch (err) {
        res.status(500).json({ message: "Error uploading profile", error: err.message });
    }
};

const tokenVerification = async (req, res) => {
    if(!req.user) return res.status(404).json({message: "Not found"});

    try {
        const user = await User.findById(req.user.userId);

        if(!user) return res.status(404).json({ message: "User not founded" });

        res.json({
            email: user.email,
            username: user.username,
            profileImgUrl: user.profileImgUrl,
            role: user.role,
            id: user._id,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        })
    } catch(err) {
        console.error('Login Error:', err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = {userRegister, userLogin, uploadProfile, tokenVerification};