const Post = require("../models/Post");
const User = require("../models/User");

const createPost = async (req, res) => {
  const { body, userId } = req.body;
  const pictureIMG = req.file
    ? req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename
    : "";

  const user = await User.findById(userId);
  try {
    const newPost = new Post({
      user: {
        userId: user.id,
        photo: user.picturePath,
        username: user.username,
      },
      body,
      picturePost: pictureIMG,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ mssg: error.message });
  }
};

const commentPost = async (req, res) => {
  // get post id with params
  const { id } = req.params;
  const { userId, body } = req.body;

  try {
    const post = await Post.findById(id);
    if ((userId === null) & (body === null))
      return res.status(400).json({ mssg: "Missed body" });
    post.comments.push({ userId, body });

    await post.save();
    res.status(203).json(post);
  } catch (error) {
    res.status(500).json({ mssg: error, message });
  }
};

const getPosts = async (req, res) => {
  try {
    const result = await Post.find({}).sort({ createdAt: -1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ mssg: error.message });
  }
};
const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Post.findById(id);
    res.status(200).json(result);
  } catch (error) {}
};
const likesPost = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findById(id);
    const cekLikes = post.likes.map((data) => data.userId);
    if (cekLikes.includes(userId)) {
      post.likes = post.likes.filter((data) => data.userId !== userId);
    } else {
      if (userId === null && userId === undefined)
        return res.status(400).json({ mssg: "Missed body" });
      post.likes.push({ userId });
    }
    await post.save();
    res.status(203).json(post);
  } catch (error) {
    res.status(500).json({ mssg: error.message });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Post.findByIdAndRemove(id);
    res.status(203).json(result);
  } catch (error) {
    res.status(500).json({ mssg: error.message });
  }
};
module.exports = {
  createPost,
  commentPost,
  getPosts,
  getPost,
  likesPost,
  deletePost,
};
