const Like = require("../models/like.model.js");
const Post = require("../models/post.model.js");

const toggleLike = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user.userId;

    const existingLike = await Like.findOne({ postId, userId });

    if (existingLike) {
      await Like.findOneAndDelete({ postId, userId });
      await Post.findByIdAndUpdate(postId, { $inc: { likeCount: -1 } });

    } else {
      const newLike = new Like({ postId, userId });
      await newLike.save();
      await Post.findByIdAndUpdate(postId, { $inc: { likeCount: 1 } });
    }

    // Always return the updated post with populated user
    const post = await Post.findById(postId).populate("userId", "username profileImgUrl");

    return res.status(200).json(post);

  } catch (err) {
    res.status(500).json({ message: "Error toggling like", error: err.message });
  }
};


module.exports = {toggleLike};