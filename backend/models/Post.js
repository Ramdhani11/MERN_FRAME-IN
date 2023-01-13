const mongoose = require("mongoose");

const PostSchema = mongoose.Schema(
  {
    user: {
      type: Object,
      default: {},
    },
    body: {
      required: true,
      type: String,
    },
    comments: {
      type: Array,
      default: [],
    },
    likes: {
      type: Array,
      default: [],
    },
    picturePost: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
