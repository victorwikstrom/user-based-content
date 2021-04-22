import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: "String",
  description: "String",
  author: "String",
});

const PostModel = mongoose.model("post", postSchema);

export default PostModel;
