const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.post("/create", async (req, res) => {

  try {

    const { content , user} = req.body;

    const post = new Post({
      content,
      user,
    });

    await post.save();

    res.send("Post Created");

  } catch (error) {

    console.log(error);

  }

});
// GET ALL POSTS
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();

    res.json(posts);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;