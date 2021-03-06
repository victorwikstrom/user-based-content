import express from "express";
import UserModel from "../models/user.model.js";
import bcrypt from "bcrypt";

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

// AUTHENTICATE
userRouter.get("/api/users/authenticate", async (req, res) => {
  if (req.session.user) {
    res.status(200).json({
      authenticated: true,
      user: req.session.user,
    });
    return;
  }
  res.status(400).json({ authenticated: false });
});

// REGISTER
userRouter.post("/api/users/register", async (req, res) => {
  // Check if there is a logged in user
  if (req.session.username) {
    res.status(500).json("You need to log out before registration");
    return;
  }

  // Check if there is a request body
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(res.statusCode)
      .json("Error, no user data was provided in request");
    return;
  }

  const { username, password, role } = req.body;

  // Check if username is taken
  const users = await UserModel.find({});
  const existingUser = users.find((user) => user.username === username);
  if (existingUser) {
    res
      .status(500)
      .json({ message: "Username is already taken", status: res.statusCode });
    return;
  }

  // Encrypt password
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    username: username,
    password: hashedPassword,
    role: role ? role : "member",
  });
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

//LOG OUT
userRouter.delete("/api/users/logout", (req, res) => {
  if (!req.session.user) {
    res.status(400).json("You're already logged out");
    return;
  }
  req.session = null;
  res.status(200).json("You're logged out!");
});

// FIND BY ID AND DELETE
userRouter.delete("/api/users/:id", async (req, res) => {
  const user = await UserModel.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404).json("No user was found");
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

  const users = await UserModel.find({}).select("+password");

  const user = users.find((user) => user.username === username);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(404).json({
      status: res.statusCode,
      message: "Wrong username or password",
    });
    return;
  }

  req.session.user = user;

  res.status(201).json(user);
});

export default userRouter;
