const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  // Reference to the User model
      required: true,
    },
    
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true, 
    },

    postImgUrl: {
      type: String,
      default: '',
    },

    likeCount: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
