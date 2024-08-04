import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    reuired: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const user = mongoose.model("User", userSchema);
export default user;
