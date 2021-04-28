import express from "express";
import FrameModel from "../models/frame.model.js";

const frameRouter = express.Router();

// FIND ALL
frameRouter.get("/api/frames", async (req, res) => {
  const frames = await FrameModel.find({}).populate("user");
  res.status(200).json(frames);
});

// FIND ONE BY ID
frameRouter.get("/api/frames/:id", async (req, res) => {
  const frame = await FrameModel.findById(req.params.id);
  if (!frame) {
    res.status(404).json("No post was found");
    return;
  }
  res.status(200).json(frame);
});

// CREATE NEW
frameRouter.post("/api/frames", async (req, res) => {
  if (!userIsLoggedIn(req)) {
    res.status(500).json("You need to log in before you can create post");
    return;
  }

  const frame = await FrameModel.create({
    ...req.body,
    author: req.session.user.username,
    user: req.session.user._id,
    date: new Date().toDateString(),
  });
  res.status(200).json(frame);
});

// FIND BY ID AND UPDATE
frameRouter.put("/api/frames/:id", async (req, res) => {
  if (!userIsLoggedIn(req)) {
    res.status(500).json("You need to log in before you can update");
    return;
  }
  const frame = await FrameModel.findByIdAndUpdate(req.params.id, req.body);
  if (!frame) {
    res.status(404).json("No frame was found");
    return;
  }
  res.status(200).json(frame);
});

// FIND BY ID AND DELETE
frameRouter.delete("/api/frames/:id", async (req, res) => {
  if (!userIsLoggedIn(req)) {
    res.status(500).json("You need to log in before you can delete");
    return;
  }
  const frame = await FrameModel.findByIdAndDelete(req.params.id);
  if (!frame) {
    res.status(404).json("No frame was found");
    return;
  }
  res.status(200).json(frame);
});

function userIsLoggedIn(req) {
  if (req.session.user) {
    return true;
  }
  return false;
}

export default frameRouter;
