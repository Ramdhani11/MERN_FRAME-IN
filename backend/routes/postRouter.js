const express = require("express");
const {
  commentPost,
  getPosts,
  getPost,
  likesPost,
  deletePost,
} = require("../controllers/post");

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPost);
router.patch("/comments/:id", commentPost);
router.patch("/likes/:id", likesPost);
router.delete("/:id", deletePost);

module.exports = router;
