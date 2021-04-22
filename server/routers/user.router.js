import express from "express";
import UserModel from "../models/user.model.js";

const userRouter = express.Router();

// FIND ALL
userRouter.get("/api/users", async (req, res) => {
  const users = await UserModel.find({});
  if (!users) {
    res.status(res.statusCode).json("No users found");
    return;
  }
  res.status(200).json(users);
});

// CREATE NEW
userRouter.post("/api/users", async (req, res) => {
  const user = await UserModel.create(req.body);
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(res.statusCode)
      .json("Error, no user data was provided in request");
    return;
  }
  res.status(201).json(user);
});

// FIND ONE BY ID
userRouter.get("/api/users/:id", async (req, res) => {
  const user = await UserModel.findById(req.params.id);
  if (!user) {
    res.status(404).json("No user was found");
    return;
  }
  res.status(200).json(user);
});

// FIND BY ID AND DELETE
userRouter.delete("/api/users/:id", async (req, res) => {
  const user = await UserModel.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404).json("No post was found");
    return;
  }
  res.status(200).json(user);
});

// FIND BY ID AND UPDATE
userRouter.put("/api/users/:id", async (req, res) => {
  const user = await UserModel.findByIdAndUpdate(req.params.id, req.body);
  if (!user) {
    res.status(404).json("No user was found");
    return;
  }
  res.status(200).json(user);
});

// LOGIN
userRouter.post("/api/users/login", async (req, res) => {
  const { username, password } = req.body;
  const users = await UserModel.find({});
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (!user) {
    res.status(404).json("Wrong username or password");
  }

  req.session.username = user.username;

  res.status(200).json(user);
});

export default userRouter;
