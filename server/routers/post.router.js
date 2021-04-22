import express from "express";
import PostModel from "../models/post.model.js";

const postRouter = express.Router();

postRouter.get("/api/posts", async (req, res) => {
  const posts = await PostModel.find({});
  res.status(200).json(posts);
});

postRouter.get("/api/posts/:id", async (req, res) => {
  const post = await PostModel.findById(req.params.id);
  res.status(200).json(post);
});

postRouter.post("/api/posts", async (req, res) => {
  const post = await PostModel.create(req.body);
  res.status(200).json(post);
});

postRouter.put("/api/posts/:id", async (req, res) => {
  const post = await PostModel.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(post);
});

postRouter.delete("/api/posts/:id", async (req, res) => {
  const post = await PostModel.findByIdAndDelete(req.params.id);
  res.status(200).json(post);
});

export default postRouter;
