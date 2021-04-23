import express from "express";
import mongoose from "mongoose";
import frameRouter from "./routers/frame.router.js";
import userRouter from "./routers/user.router.js";
import cookieSession from "cookie-session";
import cors from "cors";

const app = express();
const PORT = 4000;

app.use(
  cookieSession({
    name: "session",
    secret: "sdg7df7gdiufgdg",
    secure: false,
    maxAge: 1000 * 60,
    httpOnly: true,
  })
);

// middleware för att skapa en req.loggedinuser om en användare loggat in, annars undefined
app.use(cors());
app.use(express.json());
app.use(frameRouter);
app.use(userRouter);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json(err.message);
});

(async function run() {
  try {
    await mongoose.connect("mongodb://localhost:27017/instaframe", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database is connected");
  } catch (error) {
    console.error(error);
  }
  app.listen(PORT, () => {
    console.log(`Server is up and running on http://localhost:${PORT}`);
  });
})();
