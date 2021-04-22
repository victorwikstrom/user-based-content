import express from "express";
import PostModel from "../models/post.model.js";

const postRouter = express.Router();

// FIND ALL
postRouter.get("/api/posts", async (req, res) => {
  const posts = await PostModel.find({});
  res.status(200).json(posts);
});

// FIND ONE BY ID
postRouter.get("/api/posts/:id", async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  if (!post) {
    res.status(404).json("No post was found");
    return;
  }
  res.status(200).json(post);
});

// CREATE NEW
postRouter.post("/api/posts", async (req, res) => {
  if (!userIsLoggedIn(req)) {
    res.status(500).json("You need to log in before you can create post");
    return;
  }
  const post = await PostModel.create(req.body);
  res.status(200).json(post);

  res.status(500).json("You need to log in before you can post");
});

// FIND BY ID AND UPDATE
postRouter.put("/api/posts/:id", async (req, res) => {
  if (!userIsLoggedIn(req)) {
    res.status(500).json("You need to log in before you can update");
    return;
  }
  const post = await PostModel.findByIdAndUpdate(req.params.id, req.body);
  if (!post) {
    res.status(404).json("No post was found");
    return;
  }
  res.status(200).json(post);
});

// FIND BY ID AND DELETE
postRouter.delete("/api/posts/:id", async (req, res) => {
  if (!userIsLoggedIn(req)) {
    res.status(500).json("You need to log in before you can delete");
    return;
  }
  const post = await PostModel.findByIdAndDelete(req.params.id);
  if (!post) {
    res.status(404).json("No post was found");
    return;
  }
  res.status(200).json(post);
});

function userIsLoggedIn(req) {
  if (req.session.username) {
    return true;
  }
  return false;
}

export default postRouter;
