const express = require("express");
const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");
const { Op } = require("sequelize");

const postRouter = express.Router();

// getting all posts
postRouter.get("/", async (req, res) => {
  const { content, q, limit, page } = req.query;

  try {
    const query = {};

    if (content) {
      query.content = content;
    } else if (q) {
      query[Op.or] = [
        { content: { [Op.like]: `%${q}%` } },
        {
          "$User.name$": {
            [Op.like]: `%${q}%`,
          },
        },
      ];
    }

    const pageNumber = parseInt(page) || 1;
    const pageLimit = parseInt(limit) || 10;
    const offset = (pageNumber - 1) * pageLimit;

    const searchData = await Post.findAndCountAll({
      where: query,
      include: [
        {
          model: User,
          as: "User",
          attributes: ["name"],
        },
      ],
      limit: pageLimit,
      offset: offset,
    });

    return res.status(200).json({
      total: searchData.count,
      totalPages: Math.ceil(searchData.count / pageLimit),
      currentPage: pageNumber,
      posts: searchData.rows,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching posts" });
  }
});

// getting post by id
postRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const postData = await Post.findByPk(id);

    if (!postData) {
      return res.status(404).json({ error: "Post not found" });
    }

    return res.status(200).json(postData);
  } catch (error) {
    console.error("Error fetching post:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching the post" });
  }
});

// creating a post
postRouter.post("/", async (req, res) => {
  try {
    await Post.create({ ...req.body });

    res.send("Post has been created successfully.");
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json("An error occurred while creating the post.");
  }
});

// deleting a post
postRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const post = await Post.findOne({
      where: { id, userId },
    });

    if (!post) {
      return res.status(403).json("You can delete only your post!");
    }

    await post.destroy();

    return res.json("Post has been deleted!");
  } catch (err) {
    return res.status(500).json("An error occurred while deleting the post.");
  }
});

// updating a post
postRouter.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOne({
      where: { id },
    });

    if (!post) {
      return res.status(404).json("Post not found.");
    }

    const { content, image, updated_at } = req.body;

    post.content = content;
    post.image = image;
    post.updated_at = updated_at;

    await post.save();

    return res.json("Post has been updated.");
  } catch (err) {
    return res.status(500).json("An error occurred while updating the post.");
  }
});

// like a post
postRouter.patch("/:id/like", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOne({
      where: { id },
    });

    if (!post) {
      return res.status(404).json("Post not found.");
    }

    const { like } = req.body;

    post.like = like;

    await post.save();

    return res.json("Post like has been updated.");
  } catch (err) {
    return res.status(500).json("An error occurred while updating the post.");
  }
});

// dislike a post
postRouter.patch("/:id/dislike", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findOne({
      where: { id },
    });

    if (!post) {
      return res.status(404).json("Post not found.");
    }

    const { dislike } = req.body;

    post.dislike = dislike;

    await post.save();

    return res.json("Post dislike has been updated.");
  } catch (err) {
    return res.status(500).json("An error occurred while updating the post.");
  }
});

module.exports = { postRouter };
