const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();
const mongoose = require("mongoose");

// Routers
const userRouter = require("./routers/user.router");
const postRouter = require("./routers/post.router");
const likeRouter = require("./routers/like.router");

const app = express();

app.use(cors({
    origin: "*", // your React app origin
    credentials: true               // ✅ allow credentials
}));

app.use(cookieParser());

// Routers
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/like", likeRouter);




mongoose.connect(process.env.db)
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(process.env.PORT, () => {
            console.log("Server is listening on port", process.env.port)
        });
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
