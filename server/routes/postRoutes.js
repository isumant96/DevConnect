const express = require("express");
const Post = require("../models/Post");

const router = express.Router();

router.post("/create", async (req, res) => {

  try {

    const { content } = req.body;

    const post = new Post({
      content,
    });

    await post.save();

    res.send("Post Created");

  } catch (error) {

    console.log(error);

  }

});

module.exports = router;