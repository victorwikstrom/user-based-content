import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: "String",
  password: { type: "String", select: false },
  role: "String",
});

const UserModel = mongoose.model("user", userSchema);

export default UserModel;
