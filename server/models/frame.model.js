import mongoose from "mongoose";

const frameSchema = new mongoose.Schema({
  title: "String",
  description: "String",
  author: "String",
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  date: "String",
  image: "String",
});

const FrameModel = mongoose.model("frame", frameSchema);

export default FrameModel;
