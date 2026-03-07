import { Post } from "../models/post.model.js";

// Create a post

const createPost = async (req, res) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || age === undefined) {
      return res.status(400).json({
        message: "All Fields are required",
      });
    }

    const post = await Post.create({ name, description, age });
    res.status(201).json({
      message: "Post Created Successfully",
      post,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

const getPosts = async (req, res) => {
  try {
    const getPosts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      err,
    });
  }
};

const updatePost = async (req, res) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "No data provided for update",
      });
    }

    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!post) {
      return res.status(404).json({
        message: "Post Not Found",
      });
    }

    res.status(200).json({
      message: "Post Updated Successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      err,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    const deleted = await Post.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({
        message: "Post Not Found",
      });
    }

    res.status(200).json({
      message: "Post Deleted Successfully",
    });
  } catch (err) {
     res.status(500).json({
      message: "Internal Server Error",
      err,
    });
  }
};

export { createPost, getPosts, updatePost, deletePost };
