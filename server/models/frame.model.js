import mongoose from "mongoose";

const frameSchema = new mongoose.Schema({
  title: "String",
  description: "String",
  author: "String",
  date: "String",
});

const FrameModel = mongoose.model("frame", frameSchema);

export default FrameModel;
