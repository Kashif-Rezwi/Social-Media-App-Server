const express = require("express");
const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");
const analyticsRouter = express.Router();

// getting total number of users analytics
analyticsRouter.get("/users", async (req, res) => {
  try {
    const userData = await User.findAndCountAll({});
    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
});

// getting top-active users analytics
analyticsRouter.get("/users/top-active", async (req, res) => {
  try {
    const userData = await User.findAndCountAll({});
    return res.status(200).json(userData);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the user" });
  }
});

// getting total number of posts analytics
analyticsRouter.get("/posts", async (req, res) => {
  try {
    const postData = await Post.findAndCountAll({});
    return res.status(200).json(postData);
  } catch (error) {
    console.error("Error fetching post:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the post" });
  }
});

// getting top-liked posts analytics
analyticsRouter.get("/posts/top-liked", async (req, res) => {
  try {
    const postData = await Post.findAndCountAll({});
    return res.status(200).json(postData);
  } catch (error) {
    console.error("Error fetching post:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the post" });
  }
});
